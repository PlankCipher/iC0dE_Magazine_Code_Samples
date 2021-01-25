import argparse

parser = argparse.ArgumentParser(
    description='Program description goes here.')

parser.add_argument('-v', '--volume', type=float, default=1,
                    help='Volume of switch sound (float)')

args = parser.parse_args()

print(args.volume)
