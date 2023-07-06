from subprocess import check_output
import sys
import os

if len(sys.argv) != 4:
    print("Usage: python test.py <num trials> botname1 botname2")
else:
    os.system("npm run convert")

    numtrials = int(sys.argv[1])
    botname1 = sys.argv[2]
    botname2 = sys.argv[3]
    p1Wins = 0
    for trial in range(numtrials):
        result = check_output(["node", "dynamite-cli.js", f"dist/bots/{botname1}.js", f"dist/bots/{botname2}.js"]).decode("ascii")
        if "Winner: p1" in result:
            p1Wins += 1
        print(f"completed trial {trial + 1}")
    
    print("-----Results------")
    print(f"Player 1 wins {p1Wins} times out of {numtrials}")
