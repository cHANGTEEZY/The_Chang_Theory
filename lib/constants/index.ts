export const tagsList = [
    { value: "technology", label: "Technology" },
    { value: "biograhpy", label: "Biograhpy" },
    { value: "history", label: "History" },
    { value: "politics", label: "Politics" },
    { value: "science", label: "Science" },
    { value: "programming", label: "Programming" },
    { value: "artificial-intelligence", label: "Artificial Intelligence" },
    { value: "machine-learning", label: "Machine Learning" },
    { value: "data-science", label: "Data Science" },
    { value: "web-development", label: "Web Development" },
    { value: "mobile-development", label: "Mobile Development" },
    { value: "cloud-computing", label: "Cloud Computing" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "blockchain", label: "Blockchain" },
    { value: "devops", label: "DevOps" },
    { value: "software-engineering", label: "Software Engineering" },
    { value: "gaming", label: "Gaming" },
    { value: "health", label: "Health" },
    { value: "fitness", label: "Fitness" },
    { value: "nutrition", label: "Nutrition" },
    { value: "mental-health", label: "Mental Health" },
    { value: "travel", label: "Travel" },
    { value: "food", label: "Food" },
    { value: "cooking", label: "Cooking" },
    { value: "recipes", label: "Recipes" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "fashion", label: "Fashion" },
    { value: "beauty", label: "Beauty" },
    { value: "home-decor", label: "Home Decor" },
    { value: "diy", label: "DIY" },
    { value: "finance", label: "Finance" },
    { value: "investing", label: "Investing" },
    { value: "economy", label: "Economy" },
    { value: "business", label: "Business" },
    { value: "entrepreneurship", label: "Entrepreneurship" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "education", label: "Education" },
    { value: "learning", label: "Learning" },
    { value: "books", label: "Books" },
    { value: "movies", label: "Movies" },
    { value: "music", label: "Music" },
    { value: "art", label: "Art" },
    { value: "photography", label: "Photography" },
    { value: "design", label: "Design" },
    { value: "environment", label: "Environment" },
    { value: "climate-change", label: "Climate Change" },
    { value: "sustainability", label: "Sustainability" },
    { value: "animals", label: "Animals" },
    { value: "pets", label: "Pets" },
    { value: "sports", label: "Sports" },
    { value: "outdoors", label: "Outdoors" },
    { value: "personal-development", label: "Personal Development" },
    { value: "philosophy", label: "Philosophy" },
    { value: "society", label: "Society" },

];


export const sampleBlogs = [
    {
        id: "1",
        title: "React Hooks",
        slug: "react-hooks",
        content: `# Understanding React Hooks

React Hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 and have become the standard way to write React components.

## Why Use Hooks?

Before hooks, you had to use class components to access lifecycle methods and state. This made code harder to reuse and understand. Hooks solve these problems by letting you extract stateful logic into reusable functions.

## Common Hooks

### useState Hook

The \`useState\` hook lets you add state to functional components. Here's how it works:

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

### useEffect Hook

The \`useEffect\` hook replaces lifecycle methods like \`componentDidMount\`, \`componentDidUpdate\`, and \`componentWillUnmount\`. It runs after render:

\`\`\`javascript
import { useEffect, useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data));
  }, []);

  return <div>{user?.name}</div>;
}
\`\`\`

## Best Practices

- **Only call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
- **Only call hooks from React function components** - Don't call hooks from regular JavaScript functions
- **Use the ESLint plugin** - Install \`eslint-plugin-react-hooks\` to enforce these rules

> Hooks are powerful and can make your React code more maintainable and easier to test!`,
        published: true,
        userId: "user1",
        createdAt: "2025-11-15T10:30:00Z",
        updatedAt: "2025-11-20T14:22:00Z",
        tags: "react, javascript, frontend, hooks"
    },
    {
        id: "2",
        title: "TypeScript Generics",
        slug: "typescript-generics",
        content: `# Mastering TypeScript Generics

Generics allow you to create reusable components that work with multiple types while maintaining type safety. They're one of the most powerful features of TypeScript.

## What Are Generics?

Generics let you write code that works with any type, but still maintains type information. Instead of using \`any\`, which loses type safety, generics allow you to capture the type and enforce it throughout your code.

## Basic Generic Function

Here's a simple example of a generic function:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

const result: string = identity("hello");
const number: number = identity(42);
\`\`\`

## Generic Constraints

You can constrain what types a generic can accept using the \`extends\` keyword:

\`\`\`typescript
interface HasLength {
  length: number;
}

function getLength<T extends HasLength>(arg: T): number {
  return arg.length;
}

getLength("hello"); // ✓ Works
getLength([1, 2, 3]); // ✓ Works
getLength(42); // ✗ Error: number has no length property
\`\`\`

## Generic Classes

Generics work with classes too:

\`\`\`typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push("two"); // ✗ Error: Type 'string' is not assignable to type 'number'
\`\`\`

## Advanced: Generic Key Lookup

Extract keys from an object with generics:

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30 };
const name = getProperty(user, "name"); // Type: string
\`\`\`

Generics take time to master but are essential for writing scalable TypeScript code!`,
        published: true,
        userId: "user2",
        createdAt: "2025-11-14T09:15:00Z",
        updatedAt: "2025-11-19T11:45:00Z",
        tags: "typescript, generics, programming"
    },
    {
        id: "3",
        title: "Database Indexing",
        slug: "database-indexing",
        content: `# Database Indexing Performance

Database indexes are crucial for query performance. They allow the database to find data without scanning every row, similar to how a book index helps you find topics quickly.

## Why Indexes Matter

Without indexes, every query performs a full table scan. With millions of rows, this becomes unbearably slow. Indexes reduce query time from seconds to milliseconds.

## Creating Indexes

Here's how to create indexes in SQL:

\`\`\`sql
-- Simple index on a column
CREATE INDEX idx_email ON users(email);

-- Composite index on multiple columns
CREATE INDEX idx_name_age ON users(last_name, first_name);

-- Unique index
CREATE UNIQUE INDEX idx_unique_email ON users(email);

-- Full-text index
CREATE FULLTEXT INDEX idx_bio ON users(bio);
\`\`\`

## Query Optimization Example

Consider this query on a users table with 1 million rows:

\`\`\`sql
-- Without index: ~2 seconds (full table scan)
-- With index: ~5ms (index lookup)
SELECT * FROM users WHERE email = 'john@example.com';
\`\`\`

## Types of Indexes

| Index Type | Use Case | Performance |
|-----------|----------|-------------|
| Primary Key | Unique identification | Fastest |
| Unique | Enforce uniqueness | Very Fast |
| Composite | Multiple column queries | Fast |
| Full-text | Text search | Moderate |
| Spatial | Geolocation queries | Varies |

## When NOT to Index

- Columns with low cardinality (few unique values)
- Columns updated frequently
- Small tables with few rows
- Boolean columns

> Remember: Indexes speed up reads but slow down writes. Balance your indexing strategy!`,
        published: true,
        userId: "user3",
        createdAt: "2025-11-13T14:20:00Z",
        updatedAt: "2025-11-18T16:30:00Z",
        tags: "database, sql, performance, optimization"
    },
    {
        id: "4",
        title: "REST API Design",
        slug: "rest-api-design",
        content: `# Building RESTful APIs

REST (Representational State Transfer) is an architectural style for designing networked applications. It uses HTTP methods to perform operations on resources.

## Core Principles

REST is built on 6 core constraints that make it scalable and maintainable. The main ones are:

- **Client-Server**: Separation of concerns
- **Statelessness**: Each request contains all information
- **Cacheability**: Responses should define themselves as cacheable or not
- **Uniform Interface**: Consistent API design

## HTTP Methods

Each HTTP method has a specific purpose:

\`\`\`javascript
// GET - Retrieve resource
GET /api/users/1

// POST - Create new resource
POST /api/users
{
  "name": "John",
  "email": "john@example.com"
}

// PUT - Update entire resource
PUT /api/users/1
{
  "name": "Jane",
  "email": "jane@example.com"
}

// PATCH - Partial update
PATCH /api/users/1
{
  "email": "newemail@example.com"
}

// DELETE - Remove resource
DELETE /api/users/1
\`\`\`

## Status Codes

Use appropriate HTTP status codes:

\`\`\`
200 OK - Request succeeded
201 Created - Resource created successfully
204 No Content - Request succeeded but no content returned
400 Bad Request - Invalid request
401 Unauthorized - Authentication required
403 Forbidden - Access denied
404 Not Found - Resource not found
500 Internal Server Error - Server error
\`\`\`

## Example Node.js Implementation

\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

const users = [];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
  const user = {
    id: users.length + 1,
    ...req.body
  };
  users.push(user);
  res.status(201).json(user);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  const deleted = users.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(3000, () => console.log('Server running on port 3000'));
\`\`\`

## Versioning

Always version your API to maintain backward compatibility:

\`\`\`
/api/v1/users
/api/v2/users
\`\`\``,
        published: true,
        userId: "user1",
        createdAt: "2025-11-12T11:00:00Z",
        updatedAt: "2025-11-17T13:20:00Z",
        tags: "api, rest, backend, nodejs"
    },
    {
        id: "5",
        title: "CSS Grid Layout",
        slug: "css-grid-layout",
        content: `# CSS Grid: Modern Layout System

CSS Grid is a two-dimensional layout system that lets you create complex, responsive layouts with simple markup and CSS.

## Grid vs Flexbox

While Flexbox is one-dimensional (rows OR columns), Grid is two-dimensional (rows AND columns simultaneously).

## Basic Grid Setup

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 60px;
  gap: 16px;
  height: 100vh;
}

.header { grid-column: 1 / -1; }
.sidebar { grid-row: 2; }
.main { grid-row: 2; }
.footer { grid-column: 1 / -1; }
\`\`\`

## Responsive Grid with Auto-Fit

Create responsive layouts without media queries:

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* Automatically creates as many columns as fit, minimum 250px each */
\`\`\`

## Named Grid Areas

Make your layout code more readable:

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr 1fr;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## HTML Example

\`\`\`html
<div class="container">
  <header>Header</header>
  <aside>Sidebar</aside>
  <main>Main Content</main>
  <footer>Footer</footer>
</div>
\`\`\`

## Advanced: Grid Auto Flow

Control how items are automatically placed:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: dense; /* Fills gaps efficiently */
}
\`\`\`

Grid is incredibly powerful and makes responsive design much easier!`,
        published: true,
        userId: "user2",
        createdAt: "2025-11-11T15:45:00Z",
        updatedAt: "2025-11-16T10:15:00Z",
        tags: "css, layout, frontend, responsive"
    },
    {
        id: "6",
        title: "Docker Containers",
        slug: "docker-containers",
        content: `# Getting Started with Docker

Docker is a containerization platform that packages your application and dependencies into a portable container. It ensures your app runs the same way everywhere.

## Why Docker?

- **Consistency**: "It works on my machine" becomes irrelevant
- **Isolation**: Apps don't interfere with each other
- **Efficiency**: Lighter than virtual machines
- **Scalability**: Easy to scale horizontally

## Basic Dockerfile

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
\`\`\`

## Docker Commands

\`\`\`bash
# Build image
docker build -t my-app:1.0 .

# Run container
docker run -p 3000:3000 my-app:1.0

# List running containers
docker ps

# Stop container
docker stop <container-id>

# View logs
docker logs <container-id>

# Execute command in container
docker exec -it <container-id> bash
\`\`\`

## Docker Compose

Manage multiple containers with docker-compose.yml:

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://db:5432/myapp
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=myapp
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
\`\`\`

## Running with Docker Compose

\`\`\`bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f app
\`\`\`

## Best Practices

- Use specific base image versions (not \`latest\`)
- Minimize layer count with multi-stage builds
- Don't run as root
- Use \`.dockerignore\` to exclude unnecessary files

> Docker makes deployment and development environments consistent!`,
        published: true,
        userId: "user3",
        createdAt: "2025-11-10T09:30:00Z",
        updatedAt: "2025-11-15T14:00:00Z",
        tags: "docker, devops, containers, deployment"
    },
    {
        id: "7",
        title: "JavaScript Async/Await",
        slug: "javascript-async-await",
        content: `# Mastering Async/Await

Async/await is syntactic sugar over promises that makes asynchronous code look and behave like synchronous code. It's one of the most important concepts in modern JavaScript.

## The Problem It Solves

Before async/await, handling asynchronous operations with promises created callback chains:

\`\`\`javascript
// Old way with promises
fetch('/api/user/1')
  .then(res => res.json())
  .then(user => fetch(\`/api/posts/\${user.id}\`))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
\`\`\`

## Async/Await Solution

\`\`\`javascript
// Modern way with async/await
async function getUserPosts() {
  try {
    const userRes = await fetch('/api/user/1');
    const user = await userRes.json();
    
    const postsRes = await fetch(\`/api/posts/\${user.id}\`);
    const posts = await postsRes.json();
    
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}

getUserPosts();
\`\`\`

## Key Concepts

### The async Keyword

The \`async\` keyword declares that a function will return a promise:

\`\`\`javascript
async function greet(name) {
  return \`Hello, \${name}!\`;
}

greet("Alice").then(msg => console.log(msg));
\`\`\`

### The await Keyword

The \`await\` keyword pauses execution until a promise resolves:

\`\`\`javascript
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}
\`\`\`

## Error Handling

Use try/catch just like synchronous code:

\`\`\`javascript
async function handleRequest() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error('Failed to fetch:', error.message);
  } finally {
    console.log('Request completed');
  }
}
\`\`\`

## Parallel Requests

Execute multiple promises concurrently:

\`\`\`javascript
// Sequential - slower
const user = await getUser();
const posts = await getPosts();

// Parallel - faster
const [user, posts] = await Promise.all([
  getUser(),
  getPosts()
]);

// Even with error handling
const results = await Promise.allSettled([
  getUser(),
  getPosts()
]);
\`\`\`

## Looping with Async

\`\`\`javascript
// Process items sequentially
async function processItems(items) {
  for (const item of items) {
    await process(item);
  }
}

// Process items in parallel
async function processItemsParallel(items) {
  await Promise.all(items.map(item => process(item)));
}
\`\`\`

Async/await revolutionized how JavaScript handles asynchronous operations!`,
        published: true,
        userId: "user1",
        createdAt: "2025-11-09T12:00:00Z",
        updatedAt: "2025-11-14T16:45:00Z",
        tags: "javascript, async, promises, programming"
    },
    {
        id: "8",
        title: "Vue 3 Composition API",
        slug: "vue-3-composition-api",
        content: `# Vue 3 Composition API Guide

The Composition API is a new way to organize component logic in Vue 3. It's more flexible than the Options API for large-scale applications.

## Options API vs Composition API

The Options API groups code by type (data, methods, computed). The Composition API groups code by feature/concern.

## Basic Composition API

\`\`\`vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0);

function increment() {
  count.value++;
}
</script>
\`\`\`

## Reactive Data with ref and reactive

\`\`\`javascript
import { ref, reactive } from 'vue';

// For primitives
const name = ref('John');
console.log(name.value); // Must use .value

// For objects
const user = reactive({
  name: 'John',
  age: 30
});
console.log(user.name); // No .value needed
\`\`\`

## Computed Properties

\`\`\`javascript
import { ref, computed } from 'vue';

const firstName = ref('John');
const lastName = ref('Doe');

const fullName = computed(() => {
  return \`\${firstName.value} \${lastName.value}\`;
});

console.log(fullName.value); // "John Doe"
\`\`\`

## Lifecycle Hooks

\`\`\`javascript
import { onMounted, onUnmounted, onUpdated } from 'vue';

onMounted(() => {
  console.log('Component mounted');
  // Fetch data, set up listeners
});

onUpdated(() => {
  console.log('Component updated');
});

onUnmounted(() => {
  console.log('Component unmounted');
  // Clean up listeners, timers
});
\`\`\`

## Complete Component Example

\`\`\`vue
<template>
  <div class="user-list">
    <input v-model="searchQuery" placeholder="Search users..." />
    <ul>
      <li v-for="user in filteredUsers" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
    <p v-if="loading">Loading...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const users = ref([]);
const searchQuery = ref('');
const loading = ref(false);

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(async () => {
  loading.value = true;
  const response = await fetch('/api/users');
  users.value = await response.json();
  loading.value = false;
});
</script>
\`\`\`

## Custom Composables

Extract logic into reusable functions:

\`\`\`javascript
// useCounter.js
import { ref } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  
  function increment() {
    count.value++;
  }
  
  function decrement() {
    count.value--;
  }
  
  return { count, increment, decrement };
}
\`\`\`

The Composition API makes Vue code more maintainable and reusable!`,
        published: true,
        userId: "user2",
        createdAt: "2025-11-08T13:15:00Z",
        updatedAt: "2025-11-13T15:30:00Z",
        tags: "vue, frontend, javascript, composition-api"
    },
    {
        id: "9",
        title: "GraphQL Basics",
        slug: "graphql-basics",
        content: `# Introduction to GraphQL

GraphQL is a query language and runtime for APIs. It lets clients request exactly the data they need, no more, no less.

## Why GraphQL?

Traditional REST APIs return fixed data structures. With GraphQL:

- Request only the fields you need
- Get multiple resources in one request
- Strong type system
- Excellent developer tools

## GraphQL Concepts

### Schema

Defines the shape of your data:

\`\`\`graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  user(id: ID!): User
  posts: [Post!]!
}
\`\`\`

### Queries

Fetch data:

\`\`\`graphql
query GetUser {
  user(id: "1") {
    id
    name
    email
    posts {
      title
    }
  }
}
\`\`\`

### Mutations

Modify data:

\`\`\`graphql
mutation CreatePost {
  createPost(
    title: "My Post"
    content: "Content here"
    userId: "1"
  ) {
    id
    title
    author {
      name
    }
  }
}
\`\`\`

## Apollo Server Example

\`\`\`javascript
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql\`
  type Query {
    hello: String
    user(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
\`;

const resolvers = {
  Query: {
    hello: () => 'Hello, World!',
    user: (_, { id }) => ({
      id,
      name: 'John Doe',
      email: 'john@example.com'
    })
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000);
\`\`\`

## Advantages Over REST

| Feature | REST | GraphQL |
|---------|------|---------|
| Over-fetching | Common | Prevented |
| Under-fetching | Common | Prevented |
| Version management | Need v1, v2, etc. | Single endpoint |
| Real-time | Polling needed | Subscriptions |
| Developer tools | Limited | Excellent |

## Subscriptions for Real-time

\`\`\`graphql
subscription OnPostCreated {
  postCreated {
    id
    title
    author {
      name
    }
  }
}
\`\`\`

GraphQL is transforming how modern APIs are built!`,
        published: true,
        userId: "user3",
        createdAt: "2025-11-07T10:45:00Z",
        updatedAt: "2025-11-12T12:00:00Z",
        tags: "graphql, api, backend, programming"
    },
    {
        id: "10",
        title: "Web Performance Optimization",
        slug: "web-performance-optimization",
        content: `# Optimizing Web Performance

Web performance directly impacts user experience and SEO. Faster sites have better engagement, lower bounce rates, and higher conversions.

## Core Web Vitals

Google's three key metrics for page quality:

### Largest Contentful Paint (LCP)

Time until largest element renders. Target: < 2.5 seconds

\`\`\`javascript
// Monitor LCP
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('LCP:', entry.renderTime || entry.loadTime);
  }
});

observer.observe({ entryTypes: ['largest-contentful-paint'] });
\`\`\`

### Cumulative Layout Shift (CLS)

Unexpected layout changes. Target: < 0.1

\`\`\`css
/* Prevent layout shift - reserve space for images */
img {
  width: 200px;
  height: 200px;
}

/* Use aspect-ratio for responsive images */
img {
  aspect-ratio: 16 / 9;
  width: 100%;
  height: auto;
}
\`\`\`

### First Input Delay (FID)

Time to respond to user input. Target: < 100ms

## Optimization Techniques

### 1. Code Splitting

\`\`\`javascript
// Webpack dynamic import
const HeavyComponent = React.lazy(() =>
  import('./HeavyComponent')
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

### 2. Image Optimization

\`\`\`html
<!-- Use modern formats with fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description">
</picture>

<!-- Lazy load images -->
<img src="image.jpg" loading="lazy" alt="Description">
\`\`\`

### 3. Minification and Compression

\`\`\`bash
# Gzip compression (reduces file size by 60-80%)
gzip -9 file.js

# Brotli compression (even better)
brotli file.js
\`\`\`

### 4. Caching Strategy

\`\`\`javascript
// Service Worker caching
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/js/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
\`\`\`

## Performance Checklist

- ✓ Minimize JavaScript bundle size
- ✓ Lazy load images and components
- ✓ Enable compression (gzip/brotli)
- ✓ Use CDN for static assets
- ✓ Implement browser caching
- ✓ Optimize database queries
- ✓ Use async/defer for scripts
- ✓ Monitor Core Web Vitals

> A fast website is a happy user! Invest in performance.`,
        published: true,
        userId: "user1",
        createdAt: "2025-11-06T14:30:00Z",
        updatedAt: "2025-11-11T09:20:00Z",
        tags: "performance, optimization, frontend, web"
    }
];