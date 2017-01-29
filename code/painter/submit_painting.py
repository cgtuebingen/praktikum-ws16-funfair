import requests
import urllib
import time
import sys
from sys import platform
if platform != "darwin":
    import pygame
from PIL import Image
#from resizeimage import resizeimage
import scipy.misc
import os



DEFAULT_DIR = "result_imgs"
DEFAULT_STYLE = "45"
SNAPSHOT_ORIG_NAME = "snapshot_orig.jpg"
SNAPSHOT_RESIZED_NAME = "snapshot_resized.jpg"
SNAPSHOT_PAINTED_NAME = "snapshot_painted.jpg"


def paint_image(image_path,
                output_path,
                style=DEFAULT_STYLE):
    """Use DEEPART API to paint an image in a certain style."""

    r = requests.post('http://turbo.deepart.io/api/post/',
                       data={'style': style,
                             'return_url': 'http://my.return/' },
                       files={ 'input_image': ( 'file.jpg', open(image_path, 'rb'),
                               'image/jpeg' ) } )
    img=r.text
    link=("http://turbo.deepart.io/media/output/%s.jpg" % img)
    print link

    max_num_seconds = 15

    for i in range(max_num_seconds):

        seconds = 1+i
        time.sleep(1)
        urllib.urlretrieve(link, output_path)

        # make sure it actually worked
        try:
            img = Image.open(output_path)
            img.close()
            print "Image painted successfully."
            break        

        except:
            print "Image retrieval no. "+str(i+1)+" failed! Trying again allowing the following time: "+str(seconds+1)+"s."
        

def take_image(img_path, img_name):
    """Take a snapshot using a computer's in-built camera."""

    import pygame.camera
    pygame.camera.init()
    pygame.camera.list_cameras()

    dirs = os.listdir("/dev/") 
    camera_name = ""
    for d in dirs:
        if d.startswith("video"):
            camera_name = d
            break

    assert(d != ""), "no camera found. This function only works for linux."

    cam = pygame.camera.Camera("/dev/"+camera_name, (640, 480))
    cam.start()
    time.sleep(0.1)  # You might need something higher in the beginning
    img = cam.get_image()

    if not os.path.exists(img_path):
        os.makedirs(img_path)

    pygame.image.save(img, os.path.join(img_path, img_name))
    cam.stop()


def resize_image(img_path, res_path):
    """Resize image to correct format (512, 512)."""

    img = Image.open(img_path)

    width, height = img.size

    minimum = min([width, height])

    left = (width - minimum)/2
    right = (width + minimum)/2
    top = (height - minimum)/2
    bottom = (height + minimum)/2

    img = img.crop((left, top, right, bottom))

    img = scipy.misc.imresize(img, (512, 512))
    scipy.misc.imsave(res_path, img)


def take_snapshot_and_paint(path=DEFAULT_DIR,
                            style=DEFAULT_STYLE):
    """Take a snapshot, resize to correct format and paint it."""

    orig_path = os.path.join(path, SNAPSHOT_ORIG_NAME)
    resized_path = os.path.join(path, SNAPSHOT_RESIZED_NAME)
    painted_path = os.path.join(path, SNAPSHOT_PAINTED_NAME)

    take_image(path, SNAPSHOT_ORIG_NAME)
    resize_image(orig_path, resized_path)
    paint_image(resized_path, painted_path, style)


if __name__ == "__main__":

    take_snapshot_and_paint()


