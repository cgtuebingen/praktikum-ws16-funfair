#include <Wire.h>

#include <Arduino.h>

static uint8_t nunchuck_buf[6];

static void nunchuck_init()
{ 
/*
    Wire.begin();              
    Wire.beginTransmission(0x52);
    Wire.write((uint8_t)0x40);
    Wire.write((uint8_t)0x00); 
    Wire.endTransmission();
*/


byte cnt;

Wire.begin();
           
// init controller 
delay(1);
Wire.beginTransmission(0x52);      // device address
Wire.write(0xF0);                    // 1st initialisation register
Wire.write(0x55);                    // 1st initialisation value
Wire.endTransmission();
delay(1);
Wire.beginTransmission(0x52);
Wire.write(0xFB);                    // 2nd initialisation register
Wire.write(0x00);                    // 2nd initialisation value
Wire.endTransmission();
delay(1);
           
// read the extension type from the register block        
Wire.beginTransmission(0x52);
Wire.write(0xFA);                    // extension type register
Wire.endTransmission();
Wire.beginTransmission(0x52);
Wire.requestFrom(0x52, 6);               // request data from controller
for (cnt = 0; cnt < 6; cnt++) {
   if (Wire.available()) {
       nunchuck_buf[cnt] = Wire.read(); // Should be 0x0000 A420 0101 for Classic Controller, 0x0000 A420 0000 for nunchuck
   }
}
Wire.endTransmission();
delay(1);
           
// send the crypto key (zeros), in 3 blocks of 6, 6 & 4.
Wire.beginTransmission(0x52);
Wire.write(0xF0);                    // crypto key command register
Wire.write(0xAA);                    // sends crypto enable notice
Wire.endTransmission();
delay(1);
Wire.beginTransmission(0x52);
Wire.write(0x40);                    // crypto key data address
for (cnt = 0; cnt < 6; cnt++) {
   Wire.write(0x00);                    // sends 1st key block (zeros)
}
Wire.endTransmission();
Wire.beginTransmission(0x52);
Wire.write(0x40);                    // sends memory address
for (cnt = 6; cnt < 12; cnt++) {
   Wire.write(0x00);                    // sends 2nd key block (zeros)
}
Wire.endTransmission();
Wire.beginTransmission(0x52);
Wire.write(0x40);                    // sends memory address
for (cnt = 12; cnt < 16; cnt++) {
   Wire.write(0x00);                    // sends 3rd key block (zeros)
}
Wire.endTransmission();
delay(1);
// end device init
}

// Send a request for data to the nunchuck
// was "send_zero()"
static void nunchuck_send_request()
{
    Wire.beginTransmission(0x52);// transmit to device 0x52
    Wire.write((uint8_t)0x00);// sends one byte
    Wire.endTransmission();// stop transmitting
}

// Encode data to format that most wiimote drivers except
// only needed if you use one of the regular wiimote drivers
static char nunchuk_decode_byte (char x) {
    x = (x ^ 0x17) + 0x17;
    return x;
}

// Receive data back from the nunchuck, 
// returns 1 on successful read. returns 0 on failure
static int nunchuck_get_data()
{
    int cnt=0;
    Wire.requestFrom (0x52, 6);// request data from nunchuck
    while (Wire.available ()) {
        // receive byte as an integer
        nunchuck_buf[cnt] = nunchuk_decode_byte( Wire.read() );
        cnt++;
    }
    nunchuck_send_request();  // send request for next data payload
    // If we recieved the 6 bytes, then go print them
    if (cnt >= 5) {
        return 1;   // success
    }
    return 0; //failure
}

static void nunchuck_print_data() { 

    uint8_t joy_x_axis = nunchuck_buf[0x00];
    uint8_t joy_y_axis = nunchuck_buf[0x01];

    uint8_t z_button = ~(nunchuck_buf[0x05] >> 0) & 1;
    uint8_t c_button = ~(nunchuck_buf[0x05] >> 1) & 1;
    
    uint16_t accel_x_axis = (((uint16_t)nunchuck_buf[0x02]) << 2) | ((nunchuck_buf[0x05] >> 2) & 3);
    uint16_t accel_y_axis = (((uint16_t)nunchuck_buf[0x03]) << 2) | ((nunchuck_buf[0x05] >> 4) & 3);
    uint16_t accel_z_axis = (((uint16_t)nunchuck_buf[0x04]) << 2) | ((nunchuck_buf[0x05] >> 6) & 3);

    //Serial.print("joy:");
    Serial.print(joy_x_axis,DEC);
    Serial.print(",");
    Serial.print(joy_y_axis, DEC);
    Serial.print(",");

//    Serial.print("acc:");
    Serial.print(accel_x_axis, DEC);
    Serial.print(",");
    Serial.print(accel_y_axis, DEC);
    Serial.print(",");
    Serial.print(accel_z_axis, DEC);
    Serial.print(",");

//    Serial.print("but:");
    Serial.print(z_button, DEC);
    Serial.print(",");
    Serial.print(c_button, DEC);

    Serial.print("\n"); 

}

void setup() {
    Serial.begin(9600);
    nunchuck_init(); 
}

void loop() {
    nunchuck_get_data();
    nunchuck_print_data();
    delay(1);
}

