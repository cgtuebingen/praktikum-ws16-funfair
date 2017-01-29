import requests
import urllib
import time
import sys
import pygame
from PIL import Image
from resizeimage import resizeimage
import scipy.misc
import os


DEFAULT_STYLE = "45"
DEFAULT_IMG_PATH = "lena.jpg"
OUTPUT_PATH = "res.jpg"
RESULT_PATH = "result_imgs"
SNAPSHOT_PATH = os.path.join(RESULT_PATH, "snapshot.jpg")
SNAPSHOT_PATH_RESIZED = os.path.join(RESULT_PATH, "snapshot_resized.jpg")
SNAPSHOT_PATH_PAINTED = os.path.join(RESULT_PATH, "painted_snapshot.jpg")


def paint_image(style=DEFAULT_STYLE, image_path=DEFAULT_IMG_PATH,
                      output_path=OUTPUT_PATH):
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
            break        

        except:
            print "No. "+str(i+1)+" failed! Trying again allowing the following time: "+str(seconds+1)+"s."
        

def take_image():
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

    assert(d != ""), "no camera found"

    cam = pygame.camera.Camera("/dev/"+camera_name, (640, 480))
    cam.start()
    time.sleep(0.1)  # You might need something higher in the beginning
    img = cam.get_image()

    if not os.path.exists(RESULT_PATH):
        os.makedirs(RESULT_PATH)

    pygame.image.save(img, SNAPSHOT_PATH)
    cam.stop()


def resize_image():
    """Resize image to correct format (512, 512)."""

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
    """Paint an image in all possible styles."""

    nonexistent = [2, 3, 4, 5, 7, 9, 11, 13, 14, 18, 20, 29, 44, 46]
    for i in range(1, 47):
        if i not in nonexistent:
            paint_image(str(i),
                        IMAGE_PATH,
                        "styles/lena_"+str(i)+".jpg")


def take_snapshot_and_paint(style=DEFAULT_STYLE,
                            resized_path=SNAPSHOT_PATH_RESIZED,
                            painted_path=SNAPSHOT_PATH_PAINTED):
    """Take a snapshot, resize to correct format and paint it."""

    take_image()
    resize_image()
    paint_image(style, resized_path, painted_path)


if __name__ == "__main__":

    take_snapshot_and_paint()

