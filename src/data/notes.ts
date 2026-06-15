export type Complexity = {
  time: string;
  space: string;
};

export type OtherWay = {
  id: string;
  title: string;
  logic: string;
  code: string;
  complexity: Complexity;
};

export type DSANote = {
  id: string;
  title: string;
  problemLogic: string;
  mistakes: string;
  code: string;
  complexity: Complexity;
  otherWays: OtherWay[];
  tags: string[];
  dateAdded: string;
  problemUrl?: string;
};

// All notes are hardcoded here by the AI assistant.
export const dsaNotes: DSANote[] = [
  {
    id: "example-1",
    title: "Two Sum",
    problemLogic: "Use a hash map to store the difference between the target and the current element as you iterate. If the difference already exists in the map, you've found the pair.",
    mistakes: "I initially tried to use a two-pointer approach, but that requires sorting the array first. Sorting destroys the original indices, which the problem specifically asks to return!",
    code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    complexity: {
      time: "O(N)",
      space: "O(N)"
    },
    otherWays: [
      {
        id: "example-1-way-1",
        title: "Brute Force (Nested Loops)",
        logic: "Use nested loops to literally check every single possible pair. Very slow but works as a baseline.",
        code: `function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) return [i, j];
    }
  }
  return [];
}`,
        complexity: {
          time: "O(N^2)",
          space: "O(1)"
        }
      }
    ],
    tags: ["Array", "Hash Table"],
    dateAdded: "2026-06-15T00:00:00.000Z"
  },
  {
    id: "example-2",
    title: "Reverse Linked List",
    problemLogic: "Maintain three pointers: prev (null initially), curr (head), and next. Iterate through the list, temporarily storing curr.next, then reversing the pointer (curr.next = prev). Advance prev and curr forward.",
    mistakes: "Forgot to store 'curr.next' in a temporary variable before changing the pointer, which completely severed the rest of the list and caused an infinite loop.",
    code: `function reverseList(head: ListNode | null): ListNode | null {
  let prev = null;
  let curr = head;
  
  while (curr !== null) {
    let nextTemp = curr.next; // Save the next node!
    curr.next = prev;         // Reverse the pointer
    prev = curr;              // Advance prev
    curr = nextTemp;          // Advance curr
  }
  
  return prev; // Prev is the new head
}`,
    complexity: {
      time: "O(N)",
      space: "O(1)"
    },
    otherWays: [
      {
        id: "example-2-way-1",
        title: "Recursive Approach",
        logic: "Recursively reach the end of the list, then as the call stack unwinds, make the next node point to the current node (head.next.next = head). Finally, set the current node's next to null.",
        code: `function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) {
    return head;
  }
  
  const p = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  
  return p;
}`,
        complexity: {
          time: "O(N)",
          space: "O(N)" // Call stack uses space
        }
      }
    ],
    tags: ["Linked List", "Recursion"],
    dateAdded: "2026-06-14T10:30:00.000Z"
  },
  {
    id: "example-3",
    title: "Valid Parentheses",
    problemLogic: "Use a Stack. Iterate through the string characters. If it's an opening bracket, push it to the stack. If it's a closing bracket, pop the top of the stack and check if it matches the corresponding opening bracket.",
    mistakes: "I didn't check if the stack was empty at the end. For inputs like '[', my code returned true because the loop finished without hitting a mismatch, but an unclosed bracket means it's invalid!",
    code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let char of s) {
    if (!map[char]) {
      // It's an opening bracket
      stack.push(char);
    } else {
      // It's a closing bracket
      const topElement = stack.length ? stack.pop() : '#';
      if (topElement !== map[char]) {
        return false;
      }
    }
  }
  
  return stack.length === 0; // Crucial check!
}`,
    complexity: {
      time: "O(N)",
      space: "O(N)"
    },
    otherWays: [],
    tags: ["String", "Stack"],
    dateAdded: "2026-06-13T15:45:00.000Z"
  },
  {
    id: "example-4",
    title: "Longest Substring Without Repeating Characters",
    problemLogic: "Sliding Window approach using a Set. Keep a 'left' and 'right' pointer. Expand 'right' if char is unique, adding it to the set. If duplicate found, remove the 'left' char from the set and shrink the window until the duplicate is gone. Update max length at each step.",
    mistakes: "I tried clearing the entire Set when I found a duplicate, which restarted the window incorrectly. You only need to remove characters from the LEFT until the duplicate is resolved.",
    code: `function lengthOfLongestSubstring(s: string): number {
  const charSet = new Set<string>();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++; // Shrink window
    }
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}`,
    complexity: {
      time: "O(N)",
      space: "O(min(N, M))" // M is size of charset
    },
    otherWays: [
      {
        id: "example-4-way-1",
        title: "Optimized Sliding Window (Map)",
        logic: "Instead of shrinking the window one by one, use a Map to store the index of the characters. When a duplicate is found, instantly jump the 'left' pointer to (duplicate_index + 1).",
        code: `function lengthOfLongestSubstring(s: string): number {
  let map = new Map<string, number>();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(map.get(s[right])! + 1, left);
    }
    map.set(s[right], right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}`,
        complexity: {
          time: "O(N)",
          space: "O(min(N, M))"
        }
      }
    ],
    tags: ["String", "Sliding Window", "Hash Table"],
    dateAdded: "2026-06-12T08:15:00.000Z"
  }
];
