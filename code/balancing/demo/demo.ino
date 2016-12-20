#include <Wire.h>

/**
 * @license Nunchuk Arduino library v0.0.1 16/12/2016
 * http://www.xarg.org/2016/12/using-a-wii-nunchuk-with-arduino/
 *
 * Copyright (c) 2016, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/

#ifndef NUNCHUK_H
#define NUNCHUK_H

#include <Wire.h>

// Calibration accelerometer values, depends on your Nunchuk
#define NUNCHUK_ACCEL_X_ZERO 512
#define NUNCHUK_ACCEL_Y_ZERO 512
#define NUNCHUK_ACCEL_Z_ZERO 512

// Calibration joystick values
#define NUNCHUK_JOYSTICK_X_ZERO 127
#define NUNCHUK_JOYSTICK_Y_ZERO 128

// Whether to disable encryption. Enabling encryption means that every packet must be decrypted, which wastes cpu cycles. Cheap Nunchuk clones have problems with the encrypted init sequence, so be sure you know what you're doing
#define NUNCHUK_DISABLE_ENCRYPTION 1

// Print debug information instead of a CSV stream to the serial port
#define NUNCHUK_DEBUG 0

// The Nunchuk I2C address
#define NUNCHUK_ADDRESS 0x52

#if ARDUINO >= 100
#define I2C_READ() Wire.read()
#define I2C_WRITE(x) Wire.write(x)
#else
#define I2C_READ() Wire.receive()
#define I2C_WRITE(x) Wire.send(x)
#endif

#define I2C_START(x) Wire.beginTransmission(x)
#define I2C_STOP() Wire.endTransmission()

#ifndef CPU_FREQ 
#define CPU_FREQ 16000000L 
#endif

#ifndef TWI_FREQ 
#define TWI_FREQ 400000L 
#endif

uint8_t nunchuk_data[6];
uint8_t nunchuk_cali[16];

/**
 * Use normal analog ports as power supply, which is useful if you want to have all pins in a row
 * Like for the famous WiiChuck adapter
 * @see https://todbot.com/blog/2008/02/18/wiichuck-wii-nunchuck-adapter-available/
 */
static void nunchuk_init_power() {
    // Add power supply for port C2 (GND) and C3 (PWR)
    PORTC &= ~_BV(PORTC2);
    PORTC |= _BV(PORTC3);
    DDRC |= _BV(PORTC2) | _BV(PORTC3);
    delay(100);
}

/**
 * Initializes the Nunchuk communication by sending a sequence of bytes
 */
static void nunchuk_init() {

    // Change TWI speed for nuchuk, which uses Fast-TWI (400kHz)
    // Normally this will be set in twi_init(), but this hack works without modifying the original source
    TWBR = ((CPU_FREQ / TWI_FREQ) - 16) / 2;

#ifdef NUNCHUK_DISABLE_ENCRYPTION
    I2C_START(NUNCHUK_ADDRESS);
    I2C_WRITE(0xF0);
    I2C_WRITE(0x55);
    I2C_STOP();

    I2C_START(NUNCHUK_ADDRESS);
    I2C_WRITE(0xFB);
    I2C_WRITE(0x00);
    I2C_STOP();
#else
    I2C_START(NUNCHUK_ADDRESS);
    I2C_WRITE(0x40);
    I2C_WRITE(0x00);
    I2C_STOP();
#endif

#if NUNCHUK_DEBUG
    Serial.print("Ident: "); // 0xA4200000 for Nunchuck, 0xA4200101 for Classic, 0xA4200402 for Balance

    I2C_START(NUNCHUK_ADDRESS);
    I2C_WRITE(0xFA);
    I2C_STOP();

    Wire.requestFrom(NUNCHUK_ADDRESS, 6);
    for (uint8_t i = 0; i < 6; i++) {
        if (Wire.available()) {
            Serial.print(I2C_READ(), HEX);
            Serial.print(" ");
        }
    }
    I2C_STOP();
    Serial.println("");

    delay(100); // Wait for serial transfer, before loop()ing
#endif

}

/**
 * Decodes a byte if encryption is used
 * 
 * @param x The byte to be decoded
 */
static inline uint8_t nunchuk_decode_byte(uint8_t x) {
#ifdef NUNCHUK_DISABLE_ENCRYPTION
    return x;
#else
    return (x ^ 0x17) + 0x17;
#endif
}

/**
 * Central function to read a full chunk of data from Nunchuk
 * 
 * @return A boolean if the data transfer was successful
 */
static uint8_t nunchuk_read() {

    uint8_t i;
    Wire.requestFrom(NUNCHUK_ADDRESS, 6);
    for (i = 0; i < 6 && Wire.available(); i++) {
        nunchuk_data[i] = nunchuk_decode_byte(I2C_READ());
    }

    // send new request
    I2C_START(NUNCHUK_ADDRESS);
    I2C_WRITE(0x00);
    I2C_STOP();

    return i == 6;
}

/**
 * Checks the current state of button Z
 */
static uint8_t nunchuk_buttonZ() {
    return (~nunchuk_data[5] >> 0) & 1;
}

/**
 * Checks the current state of button C
 */
static uint8_t nunchuk_buttonC() {
    return (~nunchuk_data[5] >> 1) & 1;
}

/**
 * Retrieves the raw X-value of the joystick
 */
static uint8_t nunchuk_joystickX_raw() {
    return nunchuk_data[0];
}

/**
 * Retrieves the raw Y-value of the joystick
 */
static uint8_t nunchuk_joystickY_raw() {
    return nunchuk_data[1];
}

/**
 * Retrieves the calibrated X-value of the joystick
 */
static int16_t nunchuk_joystickX() {
    return (int16_t) nunchuk_joystickX_raw() - (int16_t) NUNCHUK_JOYSTICK_X_ZERO;
}

/**
 * Retrieves the calibrated Y-value of the joystick
 */
static int16_t nunchuk_joystickY() {
    return (int16_t) nunchuk_joystickY_raw() - (int16_t) NUNCHUK_JOYSTICK_Y_ZERO;
}

/**
 * Calculates the angle of the joystick
 */
static float nunchuk_joystick_angle() {
    return atan2((float) nunchuk_joystickY(), (float) nunchuk_joystickX());
}

/**
 * Retrieves the raw X-value of the accelerometer
 */
static uint16_t nunchuk_accelX_raw() {
    return ((uint16_t) nunchuk_data[2] << 2) | ((nunchuk_data[5] >> 2) & 3);
}

/**
 * Retrieves the raw Y-value of the accelerometer
 */
static uint16_t nunchuk_accelY_raw() {
    return ((uint16_t) nunchuk_data[3] << 2) | ((nunchuk_data[5] >> 4) & 3);
}

/**
 * Retrieves the raw Z-value of the accelerometer
 */
static uint16_t nunchuk_accelZ_raw() {
    return ((uint16_t) nunchuk_data[4] << 2) | ((nunchuk_data[5] >> 6) & 3);
}

/**
 * Retrieves the calibrated X-value of the accelerometer
 */
static int16_t nunchuk_accelX() {
    return (int16_t) nunchuk_accelX_raw() - (int16_t) NUNCHUK_ACCEL_X_ZERO;
}

/**
 * Retrieves the calibrated Y-value of the accelerometer
 */
static int16_t nunchuk_accelY() {
    return (int16_t) nunchuk_accelY_raw() - (int16_t) NUNCHUK_ACCEL_Y_ZERO;
}

/**
 * Retrieves the calibrated Z-value of the accelerometer
 */
static int16_t nunchuk_accelZ() {
    return (int16_t) nunchuk_accelZ_raw() - (int16_t) NUNCHUK_ACCEL_Z_ZERO;
}

/**
 * Calculates the pitch angle of the Nunchuk
 */
static float nunchuk_pitch() {
    return atan2((float) nunchuk_accelY(), (float) nunchuk_accelZ());
}

/**
 * Calculates the roll angle of the Nunchuk
 */
static float nunchuk_roll() {
    return atan2((float) nunchuk_accelX(), (float) nunchuk_accelZ());
}

/**
 * A handy function to print either verbose information of the Nunchuk or a CSV stream for Processing
 */
static void nunchuk_print() {

#if NUNCHUK_DEBUG
    Serial.print("joy: ");
    Serial.print(nunchuk_joystickX(), DEC);
    Serial.print(", ");
    Serial.print(nunchuk_joystickY(), DEC);

    Serial.print("  acc:");
    Serial.print(nunchuk_accelX(), DEC);
    Serial.print(", ");
    Serial.print(nunchuk_accelY(), DEC);
    Serial.print(", ");
    Serial.print(nunchuk_accelZ(), DEC);

    Serial.print("  but:");
    Serial.print(nunchuk_buttonZ(), DEC);
    Serial.print(", ");
    Serial.print(nunchuk_buttonC(), DEC);
    Serial.print("\n");
#else
    Serial.print(nunchuk_joystickX(), DEC);
    Serial.print(",");
    Serial.print(nunchuk_joystickY(), DEC);
    Serial.print(",");
    Serial.print(nunchuk_accelX(), DEC);
    Serial.print(",");
    Serial.print(nunchuk_accelY(), DEC);
    Serial.print(",");
    Serial.print(nunchuk_accelZ(), DEC);
    Serial.print(",");
    Serial.print(nunchuk_buttonZ(), DEC);
    Serial.print(",");
    Serial.print(nunchuk_buttonC(), DEC);
    Serial.print("\n");
#endif
}

#endif

void setup() {

    Serial.begin(9600);
    Wire.begin();
    // nunchuk_init_power(); // A1 and A2 is power supply
    nunchuk_init();
}

void loop() {

    if (nunchuk_read()) {
        // Work with nunchuk_data
        nunchuk_print();
    }
    delay(10);
} 
