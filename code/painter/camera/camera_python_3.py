import pygame
import pygame.camera

pygame.camera.init()
#pygame.camera.list_camera() #Camera detected or not
cam = pygame.camera.Camera("/dev/video1", (512, 512))
cam.start()
img = cam.get_image()
pygame.image.save(img,"filename.jpg")
