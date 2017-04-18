import requests
import urllib
import time
from sys import platform
if platform != "darwin":
    import pygame
from PIL import Image
import scipy.misc
import os



DEFAULT_DIR = "painter/result_imgs"
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


def resize_image(img_path, res_path):
    """Resize image to correct format (512, 512)."""

    # temporary hack
    os.system("convert " + img_path + " " + img_path);

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

    resize_image(orig_path, resized_path)
    paint_image(resized_path, painted_path, style)
