def write_msg(message):
    with open("status.txt", "w") as f:
        f.write(message)
