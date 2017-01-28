
import numpy as np


WINDOW_SIZE = 250
SD_UPPER_LIMIT = 100
SD_MIDDLE_LIMIT = 50

last_values_list = [0 for i in range(len(WINDOW_SIZE))]
step_counter = 0
index = 0


def update_sensor_values(new_value):
    """Write new sensor value to last_values_list."""

    last_values_list[index] = new_value
    index = (index + 1) % WINDOW_SIZE
    step_counter += 1


def get_policy():
    """Return value between 0 (bad) and 1(good), based on sensor values."""

    if step_counter < WINDOW_SIZE:
        return 0.5

    std = np.std(last_values_list, ddof=1) # sample standard deviation

    if std < SD_LOWER_LIMIT:
        return 0.0

    elif std > SD_UPPER_LIMIT:
        return 1.0

    else:
        return 0.5
        
