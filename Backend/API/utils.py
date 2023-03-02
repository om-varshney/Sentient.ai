import numpy as np


def np_encoder(obj):
    if isinstance(obj, np.generic):
        return obj.item()
