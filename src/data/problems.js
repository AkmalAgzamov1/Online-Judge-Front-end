export const problems = [
  {
    id: 1,
    title: "Array Sum",
    topic: "Array",
    difficulty: "Easy",
    description: "Compute the sum of N integers.",
    input: "First line: N. Second line: N integers.",
    output: "Print the sum of all elements.",
    exampleInput: "5\n1 2 3 4 5",
    exampleOutput: "15",
    constraints: "1 ≤ N ≤ 10⁶\n-2×10⁹ ≤ a[i] ≤ 2×10⁹",
    timeLimit: "1s",
    xp: 15,
  },
  {
    id: 2,
    title: "Graph Traversal",
    topic: "Graphs",
    difficulty: "Medium",
    description: "Print BFS order starting from node 1 in an undirected graph.",
    input: "First line: N M. Next M lines: edges u v.",
    output: "Print BFS traversal order.",
    exampleInput: "4 3\n1 2\n2 3\n1 4",
    exampleOutput: "1 2 4 3",
    constraints: "1 ≤ N ≤ 2×10⁵\n0 ≤ M ≤ 3×10⁵\n1 ≤ u, v ≤ N",
    timeLimit: "1s",
    xp: 30,
  },
  {
  "id": 3,
  "title": "Missing Number",
  "topic": "Math",
  "difficulty": "Easy",
  "description": "You are given all numbers between 1 and n except one. Find and print the missing number.",
  "input": "First line: integer n. Second line: n-1 distinct integers between 1 and n.",
  "output": "Print the missing number.",
  "exampleInput": "5\n2 3 1 5",
  "exampleOutput": "4",
  "constraints": "2 ≤ n ≤ 2×10⁵\nAll numbers in the second line are distinct.",
  "timeLimit": "1s",
  "xp": 10
  },
  {
  id: 4,
  title: "Longest DNA Repetition",
  topic: "String",
  difficulty: "Easy",
  description: "You are given a DNA sequence consisting of characters A, C, G, and T. Your task is to find the longest repetition in the sequence. A repetition is a maximum-length substring that contains only one type of character.",
  input: "The only input line contains a string of n characters.",
  output: "Print one integer: the length of the longest repetition.",
  exampleInput: "ATTCGGGA",
  exampleOutput: "3",
  constraints: "1 ≤ n ≤ 10^6",
  timeLimit: "1s",
  xp: 15
},
{
  id: 5,
  title: "Reading Books",
  topic: "Sorting and Searching",
  difficulty: "Medium",
  description: "There are n books, and Kotivalo and Justiina will read all of them. Each book has a reading time. They cannot read the same book simultaneously, and each must read every book completely. Find the minimum total time for them to finish reading all books.",
  input: "First line: integer n. Second line: n integers t1, t2, ..., tn.",
  output: "Print one integer: the minimum total time.",
  exampleInput: "3\n2 8 3",
  exampleOutput: "16",
  constraints: "1 ≤ n ≤ 2×10^5\n1 ≤ ti ≤ 10^9",
  timeLimit: "1s",
  xp: 30
},
{
  id: 6,
  title: "Tower of Hanoi",
  topic: "Recursion",
  difficulty: "Medium",
  description: "Move all N disks from peg 1 to peg 3 using peg 2. Only one disk may be moved at a time, and no larger disk may be placed on a smaller one.",
  input: "First line: N (number of disks).",
  output: "First print the number of moves (2^N - 1). Then print each move as 'from to'.",
  exampleInput: "2",
  exampleOutput: "3\n1 2\n1 3\n2 3",
  constraints: "1 ≤ N ≤ 20\nTotal moves = 2^N - 1\nNote: Output grows exponentially.",
  timeLimit: "1s",
  xp: 40
},

{
  id: 7,
  title: "Dice Combinations",
  topic: "Dynamic Programming",
  difficulty: "Medium",
  description: "Count the number of ways to construct sum n by throwing a 6-sided dice. Each throw gives an outcome from 1 to 6. You may throw the dice one or more times. Print the number of ways modulo 1e9+7.",
  input: "The only input line contains an integer n.",
  output: "Print one integer: the number of ways to get sum n.",
  exampleInput: "3",
  exampleOutput: "4",
  constraints: "1 ≤ n ≤ 10^6",
  timeLimit: "1s",
  xp: 30
},

{
  id: 8,
  title: "Counting Rooms",
  topic: "Graphs",
  difficulty: "Medium",
  description: "You are given an n × m map of a building consisting of floor (.) and wall (#) cells. A room is a maximal connected area of floor cells. You can move up, down, left, and right through floor cells. Count how many rooms exist.",
  input: "First line: n m. Next n lines: grid with characters '.' or '#'.",
  output: "Print one integer: the number of rooms.",
  exampleInput: "5 8\n########\n#..#...#\n####.#.#\n#..#...#\n########",
  exampleOutput: "3",
  constraints: "1 ≤ n, m ≤ 1000",
  timeLimit: "1s",
  xp: 35
},
{
  id: 9,
  title: "Building Roads",
  topic: "Graphs",
  difficulty: "Medium",
  "description": "Byteland has n cities and m existing roads. Your task is to add the minimum number of roads so that all cities become connected. You must output how many roads are required and list any valid set of roads that will connect all components.",
  "input": "First line: n m. Next m lines: edges a b.",
  "output": "First print k (number of new required roads). Then print k lines: u v representing the added roads.",
  "exampleInput": "4 2\n1 2\n3 4",
  "exampleOutput": "1\n2 3",
  "constraints": "1 ≤ n ≤ 100000\n1 ≤ m ≤ 200000\n1 ≤ a,b ≤ n",
  "timeLimit": "1s",
  "xp": 35
},
{
  "id": 10,
  "title": "Bit Strings",
  "topic": "Math",
  "difficulty": "Easy",
  "description": "Given an integer n, compute the number of bit strings of length n. A bit string consists only of characters '0' and '1'. The result can be large, so print it modulo 1e9+7.",
  "input": "The only input line has an integer n.",
  "output": "Print the number of bit strings modulo 1e9+7.",
  "exampleInput": "3",
  "exampleOutput": "8",
  "constraints": "1 ≤ n ≤ 10^6",
  "timeLimit": "1s",
  "xp": 20
},

{
  "id": 11,
  "title": "Trailing Zeros",
  "topic": "Math",
  "difficulty": "Easy",
  "description": "Given an integer n, compute how many trailing zeros appear in n!. Trailing zeros are created by pairs of prime factors 2 and 5, and since factorials have more 2s than 5s, the answer is the count of factors of 5 in n!.",
  "input": "The only input line has an integer n.",
  "output": "Print the number of trailing zeros in n!.",
  "exampleInput": "20",
  "exampleOutput": "4",
  "constraints": "1 ≤ n ≤ 10^9",
  "timeLimit": "1s",
  "xp": 15
},
{
  "id": 12,
  "title": "Distinct Numbers",
  "topic": "Sorting and Searching",
  "difficulty": "Easy",
  "description": "You are given a list of n integers. Your task is to determine how many distinct values appear in the list.",
  "input": "First line: integer n. Second line: n integers x₁, x₂, …, xₙ.",
  "output": "Print one integer: the number of distinct values.",
  "exampleInput": "5\n2 3 2 2 3",
  "exampleOutput": "2",
  "constraints": "1 ≤ n ≤ 2·10^5\n1 ≤ x_i ≤ 10^9",
  "timeLimit": "1s",
  "xp": 10
},
{
  "id": 13,
  "title": "Apartments",
  "topic": "Sorting and Searching",
  "difficulty": "Medium",
  "description": "There are n applicants and m free apartments. Each applicant has a desired apartment size a_i, and will accept any apartment whose size is between a_i - k and a_i + k. Your task is to assign apartments so that the number of satisfied applicants is maximized.",
  "input": "First line: n, m, k. Next line: n integers a_i (desired sizes). Last line: m integers b_i (apartment sizes).",
  "output": "Print one integer: the maximum number of applicants who will get an apartment.",
  "exampleInput": "4 3 5\n60 45 80 60\n30 60 75",
  "exampleOutput": "2",
  "constraints": "1 ≤ n, m ≤ 2·10^5\n0 ≤ k ≤ 10^9\n1 ≤ a_i, b_i ≤ 10^9",
  "timeLimit": "1s",
  "xp": 25
},
{
  "id": 14,
  "title": "Ferris Wheel",
  "topic": "Sorting and Searching",
  "difficulty": "Medium",
  "description": "There are n children who want to ride a Ferris wheel. Each gondola can carry either one or two children, and the total weight in a gondola cannot exceed x. Given the children's weights, determine the minimum number of gondolas required.",
  "input": "First line: n and x. Second line: n integers p_i representing weights of the children.",
  "output": "Print one integer: the minimum number of gondolas needed.",
  "exampleInput": "4 10\n7 2 3 9",
  "exampleOutput": "3",
  "constraints": "1 ≤ n ≤ 2·10^5\n1 ≤ x ≤ 10^9\n1 ≤ p_i ≤ x",
  "timeLimit": "1s",
  "xp": 25
},
{
  "id": 15,
  "title": "Concert Tickets",
  "topic": "Sorting and Searching",
  "difficulty": "Medium",
  "description": "There are n concert tickets, each with a price. Then m customers arrive one by one. Each customer states the maximum price they are willing to pay, and gets the ticket with the highest price that does not exceed this limit. After a ticket is sold, it becomes unavailable. If a customer cannot get any valid ticket, print -1.",
  "input": "First line: n and m. Second line: n integers h_i (ticket prices). Third line: m integers t_i (maximum prices).",
  "output": "For each customer, print the price they pay or -1 if no ticket is available.",
  "exampleInput": "5 3\n5 3 7 8 5\n4 8 3",
  "exampleOutput": "3\n8\n-1",
  "constraints": "1 ≤ n, m ≤ 2·10^5\n1 ≤ h_i, t_i ≤ 10^9",
  "timeLimit": "1s",
  "xp": 30
},
{
  "id": 16,
  "title": "Restaurant Customers",
  "topic": "Sorting and Searching",
  "difficulty": "Medium",
  "description": "You are given the arrival and leaving times of n customers in a restaurant. Your task is to determine the maximum number of customers present at the same time.",
  "input": "First line: integer n. Next n lines: two integers a and b, the arrival and leaving times.",
  "output": "Print one integer: the maximum number of customers present simultaneously.",
  "exampleInput": "3\n5 8\n2 4\n3 9",
  "exampleOutput": "2",
  "constraints": "1 ≤ n ≤ 2·10^5\n1 ≤ a < b ≤ 10^9",
  "timeLimit": "1s",
  "xp": 20
},
{
  "id": 17,
  "title": "Sum of Two Values",
  "topic": "Hash Map",
  "difficulty": "Easy",
  "description": "Given an array of n integers, find two distinct positions such that the values at those positions sum to x. If multiple valid pairs exist, print any one of them. If no pair exists, print IMPOSSIBLE.",
  "input": "First line: n and x. Second line: n integers a_i.",
  "output": "Print two indices i and j (i ≠ j) such that a_i + a_j = x, or IMPOSSIBLE if no such pair exists.",
  "exampleInput": "4 8\n2 7 5 1",
  "exampleOutput": "2 4",
  "constraints": "1 ≤ n ≤ 2·10^5\n1 ≤ x, a_i ≤ 10^9",
  "timeLimit": "1s",
  "xp": 20
},
{
  "id": 18,
  "title": "Maximum Subarray Sum",
  "topic": "Dynamic Programming",
  "difficulty": "Medium",
  "description": "Given an array of n integers, find the maximum possible sum of any non-empty contiguous subarray. The values may be negative, so the answer is the largest achievable subarray sum.",
  "input": "First line: integer n. Second line: n integers x_i.",
  "output": "Print one integer: the maximum subarray sum.",
  "exampleInput": "8\n-1 3 -2 5 3 -5 2 2",
  "exampleOutput": "9",
  "constraints": "1 ≤ n ≤ 2·10^5\n-10^9 ≤ x_i ≤ 10^9",
  "timeLimit": "1s",
  "xp": 25
},
{
  "id": 19,
  "title": "Stick Lengths",
  "topic": "Greedy",
  "difficulty": "Easy",
  "description": "You are given n sticks with various lengths. You can increase or decrease any stick's length, and the cost is equal to the absolute difference between the new and original length. Your task is to make all sticks the same length with minimum total cost. The optimal target length is the median of all stick lengths.",
  "input": "First line: integer n. Second line: n integers p_i representing stick lengths.",
  "output": "Print one integer: the minimum total cost to make all sticks equal.",
  "exampleInput": "5\n2 3 1 5 2",
  "exampleOutput": "5",
  "constraints": "1 ≤ n ≤ 2·10^5\n1 ≤ p_i ≤ 10^9",
  "timeLimit": "1s",
  "xp": 20
},
{
  "id": 20,
  "title": "Missing Coin Sum",
  "topic": "Greedy",
  "difficulty": "Medium",
  "description": "Given n coins with positive values, determine the smallest sum that cannot be formed using any subset of the coins. Sorting the coins and greedily extending the reachable sum interval yields the optimal solution.",
  "input": "First line: integer n. Second line: n integers x_i representing coin values.",
  "output": "Print the smallest sum that cannot be constructed.",
  "exampleInput": "5\n2 9 1 2 7",
  "exampleOutput": "6",
  "constraints": "1 ≤ n ≤ 2·10^5\n1 ≤ x_i ≤ 10^9",
  "timeLimit": "1s",
  "xp": 30
},
{
  "id": 21,
  "title": "Collecting Numbers",
  "topic": "Math",
  "difficulty": "Easy",
  "description": "You are given a permutation of numbers from 1 to n. You repeatedly scan the array from left to right, collecting numbers in increasing order starting from 1. In one round, you collect as many next required numbers as possible. Your task is to determine how many rounds are needed to collect all numbers from 1 to n.",
  "input": "First line: integer n. Second line: n integers x_i forming a permutation of 1..n.",
  "output": "Print one integer: the total number of rounds.",
  "exampleInput": "5\n4 2 1 5 3",
  "exampleOutput": "3",
  "constraints": "1 ≤ n ≤ 2·10^5",
  "timeLimit": "1s",
  "xp": 20
},
{
  "id": 22,
  "title": "Towers",
  "topic": "Greedy",
  "difficulty": "Medium",
  "description": "You are given n cubes in a fixed order. You must build towers such that each cube placed on top is strictly smaller than the one below it. You either place each cube on an existing valid tower or start a new tower. Your task is to determine the minimum possible number of towers.",
  "input": "First line: integer n. Second line: n integers k_i representing cube sizes.",
  "output": "Print one integer: the minimum number of towers.",
  "exampleInput": "5\n3 8 2 1 5",
  "exampleOutput": "2",
  "constraints": "1 ≤ n ≤ 2·10^5\n1 ≤ k_i ≤ 10^9",
  "timeLimit": "1s",
  "xp": 25
},
{
  "id": 23,
  "title": "Repetitions",
  "topic": "String",
  "difficulty": "Easy",
  "description": "You are given a DNA sequence consisting of characters A, C, G, and T. Your task is to determine the length of the longest substring where all characters are the same (a repetition).",
  "input": "A single string of length n.",
  "output": "Print one integer: the maximum repetition length.",
  "exampleInput": "ATTCGGGA",
  "exampleOutput": "3",
  "constraints": "1 ≤ n ≤ 10^6",
  "timeLimit": "1s",
  "xp": 10
},
{
  "id": 24,
  "title": "Increasing Array",
  "topic": "Greedy",
  "difficulty": "Easy",
  "description": "You are given an array of n integers. You want to make the array non-decreasing by repeatedly increasing elements. Each +1 increment counts as one move. Your task is to compute the minimum number of moves required.",
  "input": "First line: integer n. Second line: n integers x_i.",
  "output": "Print the minimum number of moves to make the array non-decreasing.",
  "exampleInput": "5\n3 2 5 1 7",
  "exampleOutput": "5",
  "constraints": "1 ≤ n ≤ 2·10^5\n1 ≤ x_i ≤ 10^9",
  "timeLimit": "1s",
  "xp": 15
},

{
  "id": 25,
  "title": "Permutations",
  "topic": "Math",
  "difficulty": "Easy",
  "description": "A permutation of integers 1…n is called beautiful if no two adjacent numbers differ by 1. Given n, construct such a permutation or print 'NO SOLUTION' if impossible.",
  "input": "A single integer n.",
  "output": "Print a beautiful permutation of numbers 1…n, or 'NO SOLUTION'.",
  "exampleInput": "5",
  "exampleOutput": "4 2 5 3 1",
  "constraints": "1 ≤ n ≤ 1e6",
  "timeLimit": "1s",
  "xp": 15
},
{
  "id": 26,
  "title": "Message Route",
  "topic": "Graphs",
  "difficulty": "Medium",
  "description": "You are given n computers and m connections. You must find the shortest message route from computer 1 to computer n using the minimum number of computers. If no such route exists, print 'IMPOSSIBLE'.",
  "input": "First line: n m. Next m lines: pairs a b meaning computers a and b are connected.",
  "output": "Print k (number of computers in the shortest route), then print the route itself. If no route exists, print 'IMPOSSIBLE'.",
  "exampleInput": "5 5\n1 2\n1 3\n1 4\n2 3\n5 4",
  "exampleOutput": "3\n1 4 5",
  "constraints": "2 ≤ n ≤ 1e5\n1 ≤ m ≤ 2e5\n1 ≤ a,b ≤ n",
  "timeLimit": "1s",
  "xp": 25
}





























]
