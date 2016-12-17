# funfair

## Description:
This is a collection of several games, all centered around the setting of a - very special - funfair.
Currently, you can try out the painter-game. More games will follow until February 2017.

### Painter-game:
This is a demonstration of the "painter"-game: Look into the camera of your device, take a 
snapshot and then use your hands to "paint" a modified version of the image!

![painter-demo-video](documentation/videos/painter.gif)

In order to be able to use your hands for painting, you need to have a Leap Motion device
 (see Dependencies). If you don't happen to have such a gadget, you can also
simply use your mouse to draw.


## GIT-policy:
* **master:** always a clean working version

* **develop:** latest working version that becomes 'master' at some point

* **feature-branches:** used for developing specific features and games;
                        will be merged into 'dev' upon completion


## Setup
#### Dependencies:
* myFirstDependency


#### Optional dependencies:
* Leap Motion device

#### Recommended setup:
* **OS:** Linux Ubuntu 16.04.1 LTS 64-bit


## Usage
### Basic Usage
Funfair consists of several submodules, each implementing exactly one game. 

#### Painter-game
Currently, "painter" is a game that is already playable (even though it's far from being perfect).
 In order to play this game, go to code/painter/ and open painter.html, e.g. via
```
bash firefox painter.html
```
You should then see a picture frame containg the famous 'Lena' image. Use your mouse to draw.

## Acknowledgement

The process of creating new paintings from a photograph according to a certain style is based on:
* [Image Style Transfer Using Convolutional Neural Networks](http://www.cv-foundation.org/openaccess/content_cvpr_2016/papers/Gatys_Image_Style_Transfer_CVPR_2016_paper.pdf)
by Leon A. Gatys, Alexander S. Ecker, Matthias Bethge
* The [Deepart API](https://github.com/deepart-io/deepart-api)
* The [Turbo-Deepart website](http://turbo.deepart.io/)

