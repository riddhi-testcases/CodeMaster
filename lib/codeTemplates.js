// Code templates for different languages and use cases
const templates = {
  javascript: {
    basic: `// JavaScript Basic Template
console.log("Hello, World!");

// Variables and functions
const greeting = "Welcome to CodeMentor AI";
console.log(greeting);

function add(a, b) {
  return a + b;
}

console.log("5 + 3 =", add(5, 3));`,

    function: `// JavaScript Function Template
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// Test the functions
console.log("Fibonacci(10):", fibonacci(10));
console.log("Is 17 prime?", isPrime(17));`,

    algorithm: `// JavaScript Algorithm Template
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// Test algorithms
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", numbers);
const sorted = quickSort([...numbers]);
console.log("Sorted:", sorted);
console.log("Search for 25:", binarySearch(sorted, 25));`,

    interactive: `// JavaScript Interactive Template
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Welcome to the Interactive Calculator!");

function calculate() {
  rl.question('Enter first number: ', (num1) => {
    rl.question('Enter operator (+, -, *, /): ', (operator) => {
      rl.question('Enter second number: ', (num2) => {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        let result;
        
        switch(operator) {
          case '+': result = a + b; break;
          case '-': result = a - b; break;
          case '*': result = a * b; break;
          case '/': result = b !== 0 ? a / b : 'Error: Division by zero'; break;
          default: result = 'Error: Invalid operator';
        }
        
        console.log(\`Result: \${result}\`);
        rl.close();
      });
    });
  });
}

calculate();`,
  },

  python: {
    basic: `# Python Basic Template
print("Hello, World!")

# Variables and functions
greeting = "Welcome to CodeMentor AI"
print(greeting)

def add(a, b):
    return a + b

print(f"5 + 3 = {add(5, 3)}")`,

    function: `# Python Function Template
def fibonacci(n):
    """Calculate the nth Fibonacci number"""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

def is_prime(num):
    """Check if a number is prime"""
    if num <= 1:
        return False
    if num <= 3:
        return True
    if num % 2 == 0 or num % 3 == 0:
        return False
    
    i = 5
    while i * i <= num:
        if num % i == 0 or num % (i + 2) == 0:
            return False
        i += 6
    return True

# Test the functions
print(f"Fibonacci(10): {fibonacci(10)}")
print(f"Is 17 prime? {is_prime(17)}")`,

    algorithm: `# Python Algorithm Template
def quick_sort(arr):
    """Quick sort implementation"""
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

def binary_search(arr, target):
    """Binary search implementation"""
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Test algorithms
numbers = [64, 34, 25, 12, 22, 11, 90]
print(f"Original: {numbers}")
sorted_numbers = quick_sort(numbers.copy())
print(f"Sorted: {sorted_numbers}")
print(f"Search for 25: {binary_search(sorted_numbers, 25)}")`,

    interactive: `# Python Interactive Template
print("Welcome to the Interactive Calculator!")

def calculate():
    try:
        num1 = float(input("Enter first number: "))
        operator = input("Enter operator (+, -, *, /): ")
        num2 = float(input("Enter second number: "))
        
        if operator == '+':
            result = num1 + num2
        elif operator == '-':
            result = num1 - num2
        elif operator == '*':
            result = num1 * num2
        elif operator == '/':
            if num2 != 0:
                result = num1 / num2
            else:
                result = "Error: Division by zero"
        else:
            result = "Error: Invalid operator"
        
        print(f"Result: {result}")
    except ValueError:
        print("Error: Invalid number format")

calculate()`,
  },

  java: {
    basic: `// Java Basic Template
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Variables and methods
        String greeting = "Welcome to CodeMentor AI";
        System.out.println(greeting);
        
        int result = add(5, 3);
        System.out.println("5 + 3 = " + result);
    }
    
    public static int add(int a, int b) {
        return a + b;
    }
}`,

    function: `// Java Function Template
public class Main {
    public static void main(String[] args) {
        System.out.println("Fibonacci(10): " + fibonacci(10));
        System.out.println("Is 17 prime? " + isPrime(17));
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static boolean isPrime(int num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 == 0 || num % 3 == 0) return false;
        
        for (int i = 5; i * i <= num; i += 6) {
            if (num % i == 0 || num % (i + 2) == 0) return false;
        }
        return true;
    }
}`,

    algorithm: `// Java Algorithm Template
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original: " + Arrays.toString(numbers));
        
        int[] sorted = quickSort(numbers.clone(), 0, numbers.length - 1);
        System.out.println("Sorted: " + Arrays.toString(sorted));
        
        int index = binarySearch(sorted, 25);
        System.out.println("Search for 25: " + index);
    }
    
    public static int[] quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
        return arr;
    }
    
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
    
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,

    interactive: `// Java Interactive Template
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Welcome to the Interactive Calculator!");
        
        try {
            System.out.print("Enter first number: ");
            double num1 = scanner.nextDouble();
            
            System.out.print("Enter operator (+, -, *, /): ");
            String operator = scanner.next();
            
            System.out.print("Enter second number: ");
            double num2 = scanner.nextDouble();
            
            double result;
            switch(operator) {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    if (num2 != 0) {
                        result = num1 / num2;
                    } else {
                        System.out.println("Error: Division by zero");
                        return;
                    }
                    break;
                default:
                    System.out.println("Error: Invalid operator");
                    return;
            }
            
            System.out.println("Result: " + result);
        } catch (Exception e) {
            System.out.println("Error: Invalid input");
        } finally {
            scanner.close();
        }
    }
}`,
  },

  cpp: {
    basic: `// C++ Basic Template
#include <iostream>
#include <string>

using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    cout << "Hello, World!" << endl;
    
    string greeting = "Welcome to CodeMentor AI";
    cout << greeting << endl;
    
    int result = add(5, 3);
    cout << "5 + 3 = " << result << endl;
    
    return 0;
}`,

    function: `// C++ Function Template
#include <iostream>

using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

bool isPrime(int num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 == 0 || num % 3 == 0) return false;
    
    for (int i = 5; i * i <= num; i += 6) {
        if (num % i == 0 || num % (i + 2) == 0) return false;
    }
    return true;
}

int main() {
    cout << "Fibonacci(10): " << fibonacci(10) << endl;
    cout << "Is 17 prime? " << (isPrime(17) ? "true" : "false") << endl;
    
    return 0;
}`,

    algorithm: `// C++ Algorithm Template
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}

int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

void printVector(const vector<int>& arr) {
    for (int i = 0; i < arr.size(); i++) {
        cout << arr[i];
        if (i < arr.size() - 1) cout << ", ";
    }
    cout << endl;
}

int main() {
    vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    cout << "Original: ";
    printVector(numbers);
    
    quickSort(numbers, 0, numbers.size() - 1);
    cout << "Sorted: ";
    printVector(numbers);
    
    int index = binarySearch(numbers, 25);
    cout << "Search for 25: " << index << endl;
    
    return 0;
}`,

    interactive: `// C++ Interactive Template
#include <iostream>

using namespace std;

int main() {
    cout << "Welcome to the Interactive Calculator!" << endl;
    
    double num1, num2;
    char operator_char;
    
    cout << "Enter first number: ";
    cin >> num1;
    
    cout << "Enter operator (+, -, *, /): ";
    cin >> operator_char;
    
    cout << "Enter second number: ";
    cin >> num2;
    
    double result;
    switch(operator_char) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 != 0) {
                result = num1 / num2;
            } else {
                cout << "Error: Division by zero" << endl;
                return 1;
            }
            break;
        default:
            cout << "Error: Invalid operator" << endl;
            return 1;
    }
    
    cout << "Result: " << result << endl;
    
    return 0;
}`,
  },

  c: {
    basic: `// C Basic Template
#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    printf("Hello, World!\\n");
    
    printf("Welcome to CodeMentor AI\\n");
    
    int result = add(5, 3);
    printf("5 + 3 = %d\\n", result);
    
    return 0;
}`,

    function: `// C Function Template
#include <stdio.h>
#include <stdbool.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

bool isPrime(int num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 == 0 || num % 3 == 0) return false;
    
    for (int i = 5; i * i <= num; i += 6) {
        if (num % i == 0 || num % (i + 2) == 0) return false;
    }
    return true;
}

int main() {
    printf("Fibonacci(10): %d\\n", fibonacci(10));
    printf("Is 17 prime? %s\\n", isPrime(17) ? "true" : "false");
    
    return 0;
}`,

    algorithm: `// C Algorithm Template
#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

int binarySearch(int arr[], int size, int target) {
    int left = 0, right = size - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d", arr[i]);
        if (i < size - 1) printf(", ");
    }
    printf("\\n");
}

int main() {
    int numbers[] = {64, 34, 25, 12, 22, 11, 90};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    printf("Original: ");
    printArray(numbers, size);
    
    quickSort(numbers, 0, size - 1);
    printf("Sorted: ");
    printArray(numbers, size);
    
    int index = binarySearch(numbers, size, 25);
    printf("Search for 25: %d\\n", index);
    
    return 0;
}`,

    interactive: `// C Interactive Template
#include <stdio.h>

int main() {
    printf("Welcome to the Interactive Calculator!\\n");
    
    double num1, num2;
    char operator;
    
    printf("Enter first number: ");
    scanf("%lf", &num1);
    
    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &operator);
    
    printf("Enter second number: ");
    scanf("%lf", &num2);
    
    double result;
    switch(operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 != 0) {
                result = num1 / num2;
            } else {
                printf("Error: Division by zero\\n");
                return 1;
            }
            break;
        default:
            printf("Error: Invalid operator\\n");
            return 1;
    }
    
    printf("Result: %.2f\\n", result);
    
    return 0;
}`,
  },
}

// Add templates for other languages
const otherLanguageTemplates = {
  typescript: {
    basic: `// TypeScript Basic Template
interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}

const user: User = { name: "Alice", age: 30 };
console.log(greet(user));

function add(a: number, b: number): number {
  return a + b;
}

console.log("5 + 3 =", add(5, 3));`,

    function: `// TypeScript Function Template
type NumberArray = number[];

function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

console.log("Fibonacci(10):", fibonacci(10));
console.log("Is 17 prime?", isPrime(17));`,
  },

  go: {
    basic: `// Go Basic Template
package main

import "fmt"

func add(a, b int) int {
    return a + b
}

func main() {
    fmt.Println("Hello, World!")
    
    greeting := "Welcome to CodeMentor AI"
    fmt.Println(greeting)
    
    result := add(5, 3)
    fmt.Printf("5 + 3 = %d\\n", result)
}`,

    function: `// Go Function Template
package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func isPrime(num int) bool {
    if num <= 1 {
        return false
    }
    if num <= 3 {
        return true
    }
    if num%2 == 0 || num%3 == 0 {
        return false
    }
    
    for i := 5; i*i <= num; i += 6 {
        if num%i == 0 || num%(i+2) == 0 {
            return false
        }
    }
    return true
}

func main() {
    fmt.Printf("Fibonacci(10): %d\\n", fibonacci(10))
    fmt.Printf("Is 17 prime? %t\\n", isPrime(17))
}`,
  },

  rust: {
    basic: `// Rust Basic Template
fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    println!("Hello, World!");
    
    let greeting = "Welcome to CodeMentor AI";
    println!("{}", greeting);
    
    let result = add(5, 3);
    println!("5 + 3 = {}", result);
}`,

    function: `// Rust Function Template
fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn is_prime(num: u32) -> bool {
    if num <= 1 {
        return false;
    }
    if num <= 3 {
        return true;
    }
    if num % 2 == 0 || num % 3 == 0 {
        return false;
    }
    
    let mut i = 5;
    while i * i <= num {
        if num % i == 0 || num % (i + 2) == 0 {
            return false;
        }
        i += 6;
    }
    true
}

fn main() {
    println!("Fibonacci(10): {}", fibonacci(10));
    println!("Is 17 prime? {}", is_prime(17));
}`,
  },

  php: {
    basic: `<?php
// PHP Basic Template
echo "Hello, World!\\n";

$greeting = "Welcome to CodeMentor AI";
echo $greeting . "\\n";

function add($a, $b) {
    return $a + $b;
}

$result = add(5, 3);
echo "5 + 3 = " . $result . "\\n";
?>`,

    function: `<?php
// PHP Function Template
function fibonacci($n) {
    if ($n <= 1) return $n;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

function isPrime($num) {
    if ($num <= 1) return false;
    if ($num <= 3) return true;
    if ($num % 2 == 0 || $num % 3 == 0) return false;
    
    for ($i = 5; $i * $i <= $num; $i += 6) {
        if ($num % $i == 0 || $num % ($i + 2) == 0) return false;
    }
    return true;
}

echo "Fibonacci(10): " . fibonacci(10) . "\\n";
echo "Is 17 prime? " . (isPrime(17) ? "true" : "false") . "\\n";
?>`,
  },

  ruby: {
    basic: `# Ruby Basic Template
puts "Hello, World!"

greeting = "Welcome to CodeMentor AI"
puts greeting

def add(a, b)
  a + b
end

result = add(5, 3)
puts "5 + 3 = #{result}"`,

    function: `# Ruby Function Template
def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end

def prime?(num)
  return false if num <= 1
  return true if num <= 3
  return false if num % 2 == 0 || num % 3 == 0
  
  i = 5
  while i * i <= num
    return false if num % i == 0 || num % (i + 2) == 0
    i += 6
  end
  true
end

puts "Fibonacci(10): #{fibonacci(10)}"
puts "Is 17 prime? #{prime?(17)}"`,
  },

  swift: {
    basic: `// Swift Basic Template
import Foundation

print("Hello, World!")

let greeting = "Welcome to CodeMentor AI"
print(greeting)

func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}

let result = add(5, 3)
print("5 + 3 = \\(result)")`,

    function: `// Swift Function Template
import Foundation

func fibonacci(_ n: Int) -> Int {
    if n <= 1 { return n }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

func isPrime(_ num: Int) -> Bool {
    if num <= 1 { return false }
    if num <= 3 { return true }
    if num % 2 == 0 || num % 3 == 0 { return false }
    
    var i = 5
    while i * i <= num {
        if num % i == 0 || num % (i + 2) == 0 { return false }
        i += 6
    }
    return true
}

print("Fibonacci(10): \\(fibonacci(10))")
print("Is 17 prime? \\(isPrime(17))")`,
  },

  kotlin: {
    basic: `// Kotlin Basic Template
fun main() {
    println("Hello, World!")
    
    val greeting = "Welcome to CodeMentor AI"
    println(greeting)
    
    val result = add(5, 3)
    println("5 + 3 = $result")
}

fun add(a: Int, b: Int): Int {
    return a + b
}`,

    function: `// Kotlin Function Template
fun main() {
    println("Fibonacci(10): \${fibonacci(10)}")
    println("Is 17 prime? \${isPrime(17)}")
}

fun fibonacci(n: Int): Int {
    return if (n <= 1) n else fibonacci(n - 1) + fibonacci(n - 2)
}

fun isPrime(num: Int): Boolean {
    if (num <= 1) return false
    if (num <= 3) return true
    if (num % 2 == 0 || num % 3 == 0) return false
    
    var i = 5
    while (i * i <= num) {
        if (num % i == 0 || num % (i + 2) == 0) return false
        i += 6
    }
    return true
}`,
  },
}

// Merge all templates
Object.assign(templates, otherLanguageTemplates)

export function getTemplate(language, type = "basic") {
  return templates[language]?.[type] || templates[language]?.basic || `// ${language} template not found`
}

export function getAvailableTemplates(language) {
  return Object.keys(templates[language] || {})
}

export function getAvailableTemplateTypes(language) {
  return Object.keys(templates[language] || {})
}

export function getAllLanguages() {
  return Object.keys(templates)
}

export function hasTemplate(language, type) {
  return !!(templates[language] && templates[language][type])
}
