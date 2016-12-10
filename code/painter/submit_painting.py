import requests
import urllib
import time
import sys
import pygame
from PIL import Image
from resizeimage import resizeimage
import scipy.misc


STYLE = "1"
IMAGE_PATH = "lena.jpg"
OUTPUT_PATH = "res.jpg"
SNAPSHOT_PATH = "./paintings/snapshot.jpg"
SNAPSHOT_PATH_RESIZED = "./paintings/snapshot_resized.jpg"

def paint_image(style=STYLE, image_path=IMAGE_PATH,
                      output_path=OUTPUT_PATH):
    r = requests.post('http://turbo.deepart.io/api/post/',
                       data={'style': style,
                             'return_url': 'http://my.return/' },
                       files={ 'input_image': ( 'file.jpg', open(image_path, 'rb'),
                               'image/jpeg' ) } )
    img=r.text
    link=("http://turbo.deepart.io/media/output/%s.jpg" % img)
    print link
    time.sleep(1)
    urllib.urlretrieve(link, output_path)


def take_image():

    import pygame.camera
    pygame.camera.init()
    pygame.camera.list_cameras()
    cam = pygame.camera.Camera("/dev/video1", (640, 480))
    cam.start()
    time.sleep(0.1)  # You might need something higher in the beginning
    img = cam.get_image()
    pygame.image.save(img, SNAPSHOT_PATH)
    cam.stop()


def resize_image():

    img = Image.open(SNAPSHOT_PATH)

    width, height = img.size

    minimum = min([width, height])

    left = (width - minimum)/2
    right = (width + minimum)/2
    top = (height - minimum)/2
    bottom = (height + minimum)/2

    img = img.crop((left, top, right, bottom))

    img = scipy.misc.imresize(img, (512, 512))
    scipy.misc.imsave(SNAPSHOT_PATH_RESIZED, img)


def paint_them_all():

    nonexistent = [2, 3, 4, 5, 7, 9, 11, 13, 14, 18, 20, 29, 44, 46]
    for i in range(1, 47):
        if i not in nonexistent:
            paint_image(str(i),
                        IMAGE_PATH,
                        "styles/lena_"+str(i)+".jpg")

if __name__ == "__main__":

    take_image()
    resize_image()
    paint_image("1", SNAPSHOT_PATH_RESIZED, "./paintings/painted_snapshot.jpg")
    #paint_image()

