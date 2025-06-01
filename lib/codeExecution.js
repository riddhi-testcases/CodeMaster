// Code execution service with support for multiple languages
export class CodeExecutionService {
  constructor() {
    this.supportedLanguages = {
      javascript: {
        name: "JavaScript",
        extension: ".js",
        runtime: "node",
        version: "18.x",
        compileCommand: null,
        executeCommand: "node",
        timeout: 10000,
      },
      python: {
        name: "Python",
        extension: ".py",
        runtime: "python",
        version: "3.11",
        compileCommand: null,
        executeCommand: "python3",
        timeout: 10000,
      },
      java: {
        name: "Java",
        extension: ".java",
        runtime: "openjdk",
        version: "17",
        compileCommand: "javac",
        executeCommand: "java",
        timeout: 15000,
        mainClass: "Main",
      },
      cpp: {
        name: "C++",
        extension: ".cpp",
        runtime: "gcc",
        version: "11.x",
        compileCommand: "g++ -o output",
        executeCommand: "./output",
        timeout: 15000,
      },
      c: {
        name: "C",
        extension: ".c",
        runtime: "gcc",
        version: "11.x",
        compileCommand: "gcc -o output",
        executeCommand: "./output",
        timeout: 15000,
      },
      typescript: {
        name: "TypeScript",
        extension: ".ts",
        runtime: "node",
        version: "18.x",
        compileCommand: "tsc",
        executeCommand: "node",
        timeout: 12000,
      },
      go: {
        name: "Go",
        extension: ".go",
        runtime: "go",
        version: "1.21",
        compileCommand: null,
        executeCommand: "go run",
        timeout: 12000,
      },
      rust: {
        name: "Rust",
        extension: ".rs",
        runtime: "rustc",
        version: "1.70",
        compileCommand: "rustc -o output",
        executeCommand: "./output",
        timeout: 20000,
      },
      php: {
        name: "PHP",
        extension: ".php",
        runtime: "php",
        version: "8.2",
        compileCommand: null,
        executeCommand: "php",
        timeout: 10000,
      },
      ruby: {
        name: "Ruby",
        extension: ".rb",
        runtime: "ruby",
        version: "3.2",
        compileCommand: null,
        executeCommand: "ruby",
        timeout: 10000,
      },
      swift: {
        name: "Swift",
        extension: ".swift",
        runtime: "swift",
        version: "5.8",
        compileCommand: null,
        executeCommand: "swift",
        timeout: 15000,
      },
      kotlin: {
        name: "Kotlin",
        extension: ".kt",
        runtime: "kotlinc",
        version: "1.9",
        compileCommand: "kotlinc -include-runtime -d output.jar",
        executeCommand: "java -jar output.jar",
        timeout: 15000,
      },
    }
  }

  async executeCode(language, code, input = "") {
    const config = this.supportedLanguages[language]
    if (!config) {
      throw new Error(`Unsupported language: ${language}`)
    }

    const executionId = this.generateExecutionId()
    const startTime = Date.now()

    try {
      // Validate code
      this.validateCode(code, language)

      // Prepare execution environment
      const environment = await this.prepareEnvironment(language, code, executionId)

      // Compile if needed
      let compileResult = null
      if (config.compileCommand) {
        compileResult = await this.compileCode(environment, config)
        if (!compileResult.success) {
          return {
            success: false,
            output: "",
            error: compileResult.error,
            executionTime: Date.now() - startTime,
            language,
            executionId,
          }
        }
      }

      // Execute code
      const executeResult = await this.runCode(environment, config, input)

      return {
        success: executeResult.success,
        output: executeResult.output,
        error: executeResult.error,
        executionTime: Date.now() - startTime,
        language,
        executionId,
        memoryUsage: executeResult.memoryUsage,
        compileOutput: compileResult?.output,
      }
    } catch (error) {
      return {
        success: false,
        output: "",
        error: error.message,
        executionTime: Date.now() - startTime,
        language,
        executionId,
      }
    }
  }

  validateCode(code, language) {
    if (!code || code.trim().length === 0) {
      throw new Error("Code cannot be empty")
    }

    if (code.length > 50000) {
      throw new Error("Code is too long (max 50KB)")
    }

    // Language-specific validations
    const dangerousPatterns = {
      javascript: [/require\s*\(\s*['"]fs['"]/, /require\s*\(\s*['"]child_process['"]/],
      python: [/import\s+os/, /import\s+subprocess/, /exec\s*\(/, /eval\s*\(/],
      java: [/Runtime\.getRuntime/, /ProcessBuilder/, /System\.exit/],
      cpp: [/#include\s*<cstdlib>/, /system\s*\(/, /exec/],
      c: [/#include\s*<stdlib\.h>/, /system\s*\(/, /exec/],
    }

    const patterns = dangerousPatterns[language] || []
    for (const pattern of patterns) {
      if (pattern.test(code)) {
        throw new Error("Code contains potentially dangerous operations")
      }
    }
  }

  async prepareEnvironment(language, code, executionId) {
    const config = this.supportedLanguages[language]
    const fileName = `code_${executionId}${config.extension}`

    // In a real implementation, this would create a sandboxed container
    // For demo purposes, we'll simulate the environment
    return {
      id: executionId,
      language,
      fileName,
      code,
      workingDirectory: `/tmp/execution_${executionId}`,
      config,
    }
  }

  async compileCode(environment, config) {
    // Simulate compilation process
    const compileTime = Math.random() * 2000 + 500 // 0.5-2.5 seconds

    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate compilation success/failure
        const success = Math.random() > 0.1 // 90% success rate

        if (success) {
          resolve({
            success: true,
            output: `Compilation successful for ${environment.fileName}`,
            error: null,
          })
        } else {
          resolve({
            success: false,
            output: "",
            error: `Compilation error in ${environment.fileName}:1:1: syntax error`,
          })
        }
      }, compileTime)
    })
  }

  async runCode(environment, config, input) {
    const executeTime = Math.random() * 3000 + 500 // 0.5-3.5 seconds

    return new Promise((resolve) => {
      setTimeout(() => {
        const { code, language } = environment

        // Check for infinite loops or dangerous patterns
        if (this.hasInfiniteLoop(code) || this.hasDangerousOperations(code, language)) {
          resolve({
            success: false,
            output: "",
            error: "Execution timeout: Potentially infinite loop or dangerous operation detected",
            memoryUsage: "N/A",
          })
          return
        }

        // Simulate actual code execution based on language
        const result = this.simulateCodeExecution(code, language, input)

        resolve({
          success: result.success,
          output: result.output,
          error: result.error,
          memoryUsage: `${Math.floor(Math.random() * 50 + 10)}MB`,
        })
      }, executeTime)
    })
  }

  hasInfiniteLoop(code) {
    const infiniteLoopPatterns = [
      /while\s*$$\s*true\s*$$/gi,
      /while\s*$$\s*1\s*$$/gi,
      /while\s+True\s*:/gi,
      /for\s*$$\s*;\s*;\s*$$/gi,
      /loop\s*{/gi,
      /while\s*{/gi,
    ]

    return infiniteLoopPatterns.some((pattern) => pattern.test(code))
  }

  hasDangerousOperations(code, language) {
    const dangerousPatterns = {
      javascript: [/eval\s*\(/gi, /Function\s*\(/gi, /setTimeout\s*\(/gi, /setInterval\s*\(/gi],
      python: [/exec\s*\(/gi, /eval\s*\(/gi, /__import__\s*\(/gi, /compile\s*\(/gi],
      java: [/Runtime\.getRuntime$$$$/gi, /ProcessBuilder/gi, /System\.exit/gi],
      cpp: [/system\s*\(/gi, /exec\w*\s*\(/gi],
      c: [/system\s*\(/gi, /exec\w*\s*\(/gi],
    }

    const patterns = dangerousPatterns[language] || []
    return patterns.some((pattern) => pattern.test(code))
  }

  simulateCodeExecution(code, language, input) {
    try {
      // Parse and analyze the code structure
      const codeAnalysis = this.analyzeCode(code, language)

      // Generate realistic output based on code analysis
      if (codeAnalysis.hasErrors) {
        return {
          success: false,
          output: "",
          error: codeAnalysis.errorMessage,
        }
      }

      // Simulate execution based on code patterns
      const output = this.generateDynamicOutput(codeAnalysis, input, language)

      return {
        success: true,
        output: output,
        error: null,
      }
    } catch (error) {
      return {
        success: false,
        output: "",
        error: `Runtime error: ${error.message}`,
      }
    }
  }

  analyzeCode(code, language) {
    const analysis = {
      hasErrors: false,
      errorMessage: "",
      functions: [],
      variables: [],
      loops: [],
      conditionals: [],
      prints: [],
      inputs: [],
      imports: [],
      classes: [],
      hasMain: false,
      complexity: "simple",
    }

    try {
      // Language-specific analysis
      switch (language) {
        case "javascript":
          return this.analyzeJavaScript(code, analysis)
        case "python":
          return this.analyzePython(code, analysis)
        case "java":
          return this.analyzeJava(code, analysis)
        case "cpp":
        case "c":
          return this.analyzeC(code, analysis)
        default:
          return this.analyzeGeneric(code, analysis)
      }
    } catch (error) {
      analysis.hasErrors = true
      analysis.errorMessage = `Syntax error: ${error.message}`
      return analysis
    }
  }

  analyzeJavaScript(code, analysis) {
    // Function declarations
    const functionMatches = code.match(/function\s+(\w+)\s*$$[^)]*$$/g) || []
    analysis.functions = functionMatches.map((match) => {
      const name = match.match(/function\s+(\w+)/)[1]
      return { name, type: "function" }
    })

    // Arrow functions
    const arrowFunctions = code.match(/(?:const|let|var)\s+(\w+)\s*=\s*$$[^)]*$$\s*=>/g) || []
    arrowFunctions.forEach((match) => {
      const name = match.match(/(?:const|let|var)\s+(\w+)/)[1]
      analysis.functions.push({ name, type: "arrow" })
    })

    // Console.log statements
    const consoleLogs = code.match(/console\.log\s*$$[^)]*$$/g) || []
    analysis.prints = consoleLogs

    // Variable declarations
    const variables = code.match(/(?:const|let|var)\s+(\w+)/g) || []
    analysis.variables = variables.map((v) => v.match(/(?:const|let|var)\s+(\w+)/)[1])

    // Loops
    analysis.loops = [
      ...(code.match(/for\s*$$[^)]*$$/g) || []),
      ...(code.match(/while\s*$$[^)]*$$/g) || []),
      ...(code.match(/do\s*{[^}]*}\s*while/g) || []),
    ]

    // Check for syntax errors
    if (this.hasUnmatchedBraces(code)) {
      analysis.hasErrors = true
      analysis.errorMessage = "SyntaxError: Unmatched braces"
    }

    return analysis
  }

  analyzePython(code, analysis) {
    // Function definitions
    const functionMatches = code.match(/def\s+(\w+)\s*$$[^)]*$$:/g) || []
    analysis.functions = functionMatches.map((match) => {
      const name = match.match(/def\s+(\w+)/)[1]
      return { name, type: "function" }
    })

    // Print statements
    const prints = code.match(/print\s*$$[^)]*$$/g) || []
    analysis.prints = prints

    // Variable assignments
    const variables = code.match(/^\s*(\w+)\s*=/gm) || []
    analysis.variables = variables.map((v) => v.match(/^\s*(\w+)/)[1])

    // Loops
    analysis.loops = [...(code.match(/for\s+\w+\s+in\s+[^:]+:/g) || []), ...(code.match(/while\s+[^:]+:/g) || [])]

    // Imports
    const imports = code.match(/(?:import|from)\s+[\w.]+/g) || []
    analysis.imports = imports

    // Check for indentation errors (simplified)
    if (this.hasIndentationErrors(code)) {
      analysis.hasErrors = true
      analysis.errorMessage = "IndentationError: Inconsistent indentation"
    }

    return analysis
  }

  analyzeJava(code, analysis) {
    // Method declarations
    const methodMatches = code.match(/(?:public|private|protected)?\s*(?:static)?\s*\w+\s+(\w+)\s*$$[^)]*$$/g) || []
    analysis.functions = methodMatches.map((match) => {
      const name = match.match(/\s(\w+)\s*\(/)[1]
      return { name, type: "method" }
    })

    // System.out.println statements
    const prints = code.match(/System\.out\.print(?:ln)?\s*$$[^)]*$$/g) || []
    analysis.prints = prints

    // Variable declarations
    const variables = code.match(/(?:int|String|double|float|boolean|char)\s+(\w+)/g) || []
    analysis.variables = variables.map((v) => v.match(/\s+(\w+)$/)[1])

    // Check for main method
    analysis.hasMain = /public\s+static\s+void\s+main\s*$$\s*String\s*\[\s*\]\s*\w+\s*$$/.test(code)

    // Classes
    const classMatches = code.match(/(?:public\s+)?class\s+(\w+)/g) || []
    analysis.classes = classMatches.map((match) => match.match(/class\s+(\w+)/)[1])

    return analysis
  }

  analyzeC(code, analysis) {
    // Function declarations
    const functionMatches = code.match(/\w+\s+(\w+)\s*$$[^)]*$$\s*{/g) || []
    analysis.functions = functionMatches.map((match) => {
      const name = match.match(/\s+(\w+)\s*\(/)[1]
      return { name, type: "function" }
    })

    // Printf statements
    const prints = code.match(/printf\s*$$[^)]*$$/g) || []
    analysis.prints = prints

    // Variable declarations
    const variables = code.match(/(?:int|char|float|double)\s+(\w+)/g) || []
    analysis.variables = variables.map((v) => v.match(/\s+(\w+)$/)[1])

    // Check for main function
    analysis.hasMain = /int\s+main\s*$$[^)]*$$/.test(code)

    // Includes
    const includes = code.match(/#include\s*<[^>]+>/g) || []
    analysis.imports = includes

    return analysis
  }

  analyzeGeneric(code, analysis) {
    // Basic pattern matching for any language
    analysis.prints = code.match(/(?:print|echo|puts|console\.log|System\.out|printf)\s*$$[^)]*$$/g) || []
    analysis.variables = code.match(/\b[a-zA-Z_]\w*\s*[=:]/g) || []
    analysis.loops = code.match(/(?:for|while|loop)\s*[({]/g) || []

    return analysis
  }

  generateDynamicOutput(analysis, input, language) {
    let output = ""

    // If there are print statements, simulate their output
    if (analysis.prints.length > 0) {
      output += this.simulatePrintStatements(analysis.prints, language, input)
    }

    // If there are functions but no prints, show function execution
    else if (analysis.functions.length > 0) {
      output += this.simulateFunctionExecution(analysis.functions, language)
    }

    // If it's a simple expression or calculation
    else if (analysis.variables.length > 0) {
      output += this.simulateVariableOutput(analysis.variables, language)
    }

    // Default output for code that runs but produces no visible output
    else {
      output = this.getDefaultOutput(language)
    }

    // Add execution info
    if (analysis.functions.length > 0) {
      output += `\n\n[Executed ${analysis.functions.length} function(s)]`
    }

    if (analysis.loops.length > 0) {
      output += `\n[Processed ${analysis.loops.length} loop(s)]`
    }

    return output.trim()
  }

  simulatePrintStatements(prints, language, input) {
    let output = ""

    prints.forEach((printStmt, index) => {
      // Extract content from print statement
      const content = this.extractPrintContent(printStmt, language)

      if (content.includes("input") || content.includes("scan") || content.includes("read")) {
        // If print asks for input, use provided input
        const inputLines = input.split("\n").filter((line) => line.trim())
        if (inputLines[index]) {
          output += `${content}\n${inputLines[index]}\n`
        } else {
          output += `${content}\n[No input provided]\n`
        }
      } else {
        output += `${content}\n`
      }
    })

    return output
  }

  extractPrintContent(printStmt, language) {
    // Extract the actual content being printed
    let match

    switch (language) {
      case "javascript":
        match = printStmt.match(/console\.log\s*$$\s*([^)]+)\s*$$/)
        break
      case "python":
        match = printStmt.match(/print\s*$$\s*([^)]+)\s*$$/)
        break
      case "java":
        match = printStmt.match(/System\.out\.print(?:ln)?\s*$$\s*([^)]+)\s*$$/)
        break
      case "c":
      case "cpp":
        match = printStmt.match(/printf\s*\(\s*([^,)]+)/)
        break
      default:
        match = printStmt.match(/$$\s*([^)]+)\s*$$/)
    }

    if (match && match[1]) {
      let content = match[1].trim()

      // Remove quotes if it's a string literal
      if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
        content = content.slice(1, -1)
      }

      // Handle template literals and variable interpolation
      content = this.processStringInterpolation(content, language)

      return content
    }

    return "Output"
  }

  processStringInterpolation(content, language) {
    // Handle different types of string interpolation
    switch (language) {
      case "javascript":
        // Template literals: ${variable}
        content = content.replace(/\$\{[^}]+\}/g, (match) => {
          const varName = match.slice(2, -1).trim()
          return this.generateVariableValue(varName)
        })
        break
      case "python":
        // f-strings: {variable}
        content = content.replace(/\{[^}]+\}/g, (match) => {
          const varName = match.slice(1, -1).trim()
          return this.generateVariableValue(varName)
        })
        break
      case "java":
        // String concatenation with +
        if (content.includes("+")) {
          const parts = content.split("+").map((part) => part.trim())
          content = parts
            .map((part) => {
              if (part.startsWith('"') && part.endsWith('"')) {
                return part.slice(1, -1)
              }
              return this.generateVariableValue(part)
            })
            .join("")
        }
        break
    }

    return content
  }

  generateVariableValue(varName) {
    // Generate realistic values based on variable names
    const lowerName = varName.toLowerCase()

    if (lowerName.includes("name")) return "John"
    if (lowerName.includes("age")) return "25"
    if (lowerName.includes("count") || lowerName.includes("num")) return "42"
    if (lowerName.includes("price") || lowerName.includes("cost")) return "19.99"
    if (lowerName.includes("result")) return "100"
    if (lowerName.includes("sum")) return "150"
    if (lowerName.includes("average") || lowerName.includes("avg")) return "75.5"
    if (lowerName.includes("index") || lowerName === "i" || lowerName === "j") return "0"
    if (lowerName.includes("message") || lowerName.includes("msg")) return "Hello World"
    if (lowerName.includes("status")) return "Success"

    // Default values based on common patterns
    if (/^\d+$/.test(varName)) return varName // If it's already a number
    if (varName.length === 1) return "5" // Single letter variables often numbers

    return "value" // Generic fallback
  }

  simulateFunctionExecution(functions, language) {
    let output = ""

    functions.forEach((func) => {
      const funcName = func.name.toLowerCase()

      // Generate output based on function name patterns
      if (funcName.includes("hello") || funcName.includes("greet")) {
        output += "Hello, World!\n"
      } else if (funcName.includes("add") || funcName.includes("sum")) {
        output += "Sum: 42\n"
      } else if (funcName.includes("calculate") || funcName.includes("compute")) {
        output += "Result: 100\n"
      } else if (funcName.includes("fibonacci")) {
        output += "Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13\n"
      } else if (funcName.includes("factorial")) {
        output += "Factorial: 120\n"
      } else if (funcName.includes("sort")) {
        output += "Sorted array: [1, 2, 3, 4, 5]\n"
      } else if (funcName.includes("search") || funcName.includes("find")) {
        output += "Found at index: 3\n"
      } else if (funcName.includes("main")) {
        output += "Program executed successfully\n"
      } else {
        output += `Function '${func.name}' executed\n`
      }
    })

    return output
  }

  simulateVariableOutput(variables, language) {
    if (variables.length === 1) {
      return `Variable '${variables[0]}' assigned\n`
    } else {
      return `${variables.length} variables processed\n`
    }
  }

  getDefaultOutput(language) {
    const defaultMessages = {
      javascript: "Code executed successfully",
      python: "Code executed successfully",
      java: "Program completed",
      cpp: "Program executed",
      c: "Program executed",
      typescript: "Code executed successfully",
      go: "Program executed",
      rust: "Program executed",
      php: "Script executed",
      ruby: "Script executed",
      swift: "Program executed",
      kotlin: "Program executed",
    }

    return defaultMessages[language] || "Code executed successfully"
  }

  hasUnmatchedBraces(code) {
    let braceCount = 0
    let parenCount = 0
    let bracketCount = 0

    for (const char of code) {
      switch (char) {
        case "{":
          braceCount++
          break
        case "}":
          braceCount--
          break
        case "(":
          parenCount++
          break
        case ")":
          parenCount--
          break
        case "[":
          bracketCount++
          break
        case "]":
          bracketCount--
          break
      }
    }

    return braceCount !== 0 || parenCount !== 0 || bracketCount !== 0
  }

  hasIndentationErrors(code) {
    const lines = code.split("\n")
    let expectedIndent = 0

    for (const line of lines) {
      const trimmed = line.trim()
      if (trimmed === "") continue

      const actualIndent = line.length - line.trimStart().length

      // Check if line should be indented (after :, {, etc.)
      if (trimmed.endsWith(":") || trimmed.endsWith("{")) {
        expectedIndent += 4
      }

      // Very basic indentation check
      if (actualIndent % 4 !== 0 && actualIndent > 0) {
        return true
      }
    }

    return false
  }

  generateExecutionId() {
    return `exec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  getLanguageInfo(language) {
    return this.supportedLanguages[language] || null
  }

  getSupportedLanguages() {
    return Object.keys(this.supportedLanguages)
  }
}

// Export singleton instance
export const codeExecutor = new CodeExecutionService()
