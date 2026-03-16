import User from '../models/User.js';
import Level from '../models/Level.js';
import { connectDatabase, disconnectDatabase } from '../config/database.js';

const seedDatabase = async () => {
  try {
    await connectDatabase();

    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');

    // Sample data
    const sampleUsers = [
      {
        username: 'SungJinwoo',
        email: 'jinwoo@soloq.com',
        password: 'password123',
        level: 50,
        experience: 5000,
        highScore: 9999,
      },
      {
        username: 'Cha_Hae_In',
        email: 'haein@hunters.com',
        password: 'password123',
        level: 45,
        experience: 4500,
        highScore: 8500,
      },
      {
        username: 'GoongIl',
        email: 'goongil@guild.com',
        password: 'password123',
        level: 40,
        experience: 4000,
        highScore: 7500,
      },
      {
        username: 'YuSungho',
        email: 'yusungho@elite.com',
        password: 'password123',
        level: 35,
        experience: 3500,
        highScore: 6500,
      },
      {
        username: 'KangTaesheng',
        email: 'taesheng@guild.com',
        password: 'password123',
        level: 30,
        experience: 3000,
        highScore: 5500,
      },
    ];

    // Insert sample users
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✅ Created ${createdUsers.length} sample users`);

    createdUsers.forEach((user) => {
      console.log(`   - ${user.username} (Level ${user.level}, Score: ${user.highScore})`);
    });

    console.log('\n✨ Database seeding complete!');
    await disconnectDatabase();
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }
};

seedDatabase();
