import time
import cv2

camera_port = 0
camera = cv2.VideoCapture(camera_port)
time.sleep(0.1)  # If you don't wait, the image will be dark
return_value, image = camera.read()
cv2.imwrite("opencv.png", image)
del(camera)  # so that others can use the camera as soon as possible
