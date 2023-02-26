def write_msg(message, where):
    with open(f"status_{where}.txt", "w") as f:
        f.write(message)
