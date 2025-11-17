#!/usr/bin/env node

/**
 * Script tự động tạo MySQL database nếu chưa có
 * Tự động chạy khi setup project
 */

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Parse .env file manually (không dùng dotenv để tránh dependency)
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env');
  const env = {};
  
  if (!fs.existsSync(envPath)) {
    console.log('⚠️  .env file not found, using defaults');
    return env;
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#') && line.includes('=')) {
      const [key, ...valueParts] = line.split('=');
      env[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  return env;
}

async function createDatabaseIfNotExists() {
  const env = loadEnv();
  
  // Lấy config từ .env hoặc dùng default
  const databaseClient = env.DATABASE_CLIENT || 'sqlite';
  
  // Nếu không dùng MySQL, bỏ qua
  if (databaseClient !== 'mysql') {
    console.log(`ℹ️  Database client: ${databaseClient} - Skip MySQL setup`);
    return;
  }

  const config = {
    host: env.DATABASE_HOST || 'localhost',
    port: parseInt(env.DATABASE_PORT) || 3306,
    user: env.DATABASE_USERNAME || 'root',
    password: env.DATABASE_PASSWORD || '',
  };

  const databaseName = env.DATABASE_NAME || 'iph';

  console.log('\n🔍 Checking MySQL connection...');
  console.log(`   Host: ${config.host}:${config.port}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Database: ${databaseName}`);

  let connection;

  try {
    // Kết nối MySQL server (không chỉ định database)
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to MySQL server');

    // Kiểm tra database có tồn tại không
    const [databases] = await connection.query(
      'SHOW DATABASES LIKE ?',
      [databaseName]
    );

    if (databases.length > 0) {
      console.log(`✅ Database "${databaseName}" already exists`);
    } else {
      console.log(`⚠️  Database "${databaseName}" not found`);
      console.log(`🔨 Creating database "${databaseName}"...`);
      
      // Tạo database mới
      await connection.query(
        `CREATE DATABASE \`${databaseName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
      );
      
      console.log(`✅ Database "${databaseName}" created successfully!`);
    }

    console.log('\n✅ MySQL setup complete!\n');

  } catch (error) {
    console.error('\n❌ MySQL Error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n⚠️  MySQL server is not running or cannot be reached.');
      console.error('   Please start MySQL server and try again.');
      console.error('   Or use SQLite by changing DATABASE_CLIENT=sqlite in .env\n');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n⚠️  Access denied. Please check:');
      console.error('   - DATABASE_USERNAME in .env');
      console.error('   - DATABASE_PASSWORD in .env\n');
    }
    
    // Không exit(1) để không làm gián đoạn setup process
    console.log('⚠️  Continuing with setup... You may need to create database manually.\n');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Chỉ chạy nếu được gọi trực tiếp (không phải import)
if (require.main === module) {
  createDatabaseIfNotExists().catch((error) => {
    console.error('❌ Unexpected error:', error);
  });
}

module.exports = createDatabaseIfNotExists;
