# Piper Offroaders Club

A full-stack web application for a private off-road driving club with role-based access control, drive management, marketplace, forum, and promotion voting system.

## Features

### 🚗 Core Features
- **User Registration & Login** - JWT authentication with email/password
- **Role-Based Access Control** - Newbie, Intermediate, Advanced, Marshal, Admin levels
- **Off-Road Drive Management** - Marshals can post drives, members can join based on skill level
- **Marketplace** - Buy and sell off-road gear and vehicles
- **Community Forum** - Discussion board with categories and moderation
- **Promotion Voting System** - Marshals vote on member promotions

### 🎨 Design
- **Desert/Off-Road Theme** - Sand and brown tones with rugged styling
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean interface with Tailwind CSS
- **Interactive Elements** - Smooth animations and hover effects

### 🔧 Technical Features
- **Full-Stack Architecture** - Node.js backend with Express and MongoDB
- **Authentication** - JWT tokens with secure password hashing
- **File Uploads** - Image support for drives and marketplace items
- **Real-time Updates** - Live vote counting and status updates
- **Admin Panel** - Complete user and content management

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Express Validator** - Input validation

### Frontend
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript
- **Axios** - HTTP client for API calls
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Bebas Neue, Inter)

## Project Structure

```
piper-offroaders-club/
├── backend/
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── utils/           # Utility functions
│   ├── uploads/         # File upload directories
│   ├── server.js        # Main server file
│   └── package.json     # Backend dependencies
├── frontend/
│   ├── js/              # JavaScript files
│   ├── index.html       # Landing page
│   ├── login.html       # Login page
│   ├── register.html    # Registration page
│   ├── dashboard.html   # User dashboard
│   ├── drives.html      # Drives page
│   ├── marketplace.html # Marketplace page
│   ├── forum.html       # Forum page
│   ├── voting.html      # Marshal voting page
│   └── admin.html       # Admin panel
└── README.md            # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.0 or higher)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   Edit `.env` file with your settings:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/piper-offroaders-club
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

5. **Create upload directories:**
   ```bash
   mkdir -p uploads/drives uploads/marketplace
   ```

6. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

### Frontend Setup

The frontend is static HTML/CSS/JavaScript files that can be served by any web server:

1. **Serve the frontend files:**
   ```bash
   # Using Python
   python -m http.server 3000
   
   # Using Node.js
   npx serve frontend
   
   # Using Live Server (if installed)
   live-server frontend
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### Default Accounts
The application starts with a basic setup. You can create accounts with different roles:

- **Newbie** - Default role for new members
- **Intermediate** - Experienced drivers
- **Advanced** - Expert level drivers
- **Marshal** - Can post drives and vote on promotions
- **Admin** - Full system access

### Key Features

1. **Registration & Login:**
   - New users automatically get "newbie" role
   - JWT authentication with secure tokens

2. **Drive Management:**
   - Marshals can create drives with level requirements
   - Members can join drives matching their level
   - Automatic waitlist management

3. **Marketplace:**
   - Upload multiple images for items
   - Mark items as sold
   - Contact sellers directly

4. **Forum System:**
   - Categorized discussions
   - Admin moderation tools
   - Comment system

5. **Promotion Voting:**
   - Marshals initiate promotion votes
   - 7-day voting period
   - Majority approval required
   - Admin can override decisions

6. **Admin Panel:**
   - User management (ban/unban, role changes)
   - Content moderation
   - System statistics

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Drives
- `GET /api/drives` - Get all drives
- `POST /api/drives` - Create new drive (marshal+)
- `POST /api/drives/:id/join` - Join drive
- `POST /api/drives/:id/cancel` - Cancel participation
- `POST /api/drives/:id/attendance` - Mark attendance (marshal)

### Marketplace
- `GET /api/marketplace` - Get all items
- `POST /api/marketplace` - Create new item
- `PUT /api/marketplace/:id` - Update item
- `PATCH /api/marketplace/:id/sold` - Mark as sold
- `DELETE /api/marketplace/:id` - Delete item

### Forum
- `GET /api/forum` - Get all posts
- `POST /api/forum` - Create new post
- `GET /api/forum/:id` - Get single post
- `POST /api/forum/:id/comment` - Add comment
- `DELETE /api/forum/:id` - Delete post

### Voting
- `GET /api/votes/open` - Get active votes
- `POST /api/votes/initiate` - Start new vote
- `POST /api/votes/:id/vote` - Cast vote
- `POST /api/votes/:id/decide` - Admin finalize vote

### Admin
- `GET /api/admin/dashboard` - Get statistics
- `GET /api/admin/users` - Get all users
- `PATCH /api/admin/users/:id/role` - Update user role
- `PATCH /api/admin/users/:id/ban` - Ban/unban user
- `DELETE /api/admin/drives/:id` - Delete drive

## Security Features

- **Password Hashing** - bcryptjs for secure password storage
- **JWT Authentication** - Stateless authentication tokens
- **Role-Based Access Control** - Middleware protects routes
- **Input Validation** - Express Validator for data sanitization
- **File Upload Security** - File type and size restrictions
- **CORS Protection** - Configured for cross-origin requests

## Deployment

### Production Considerations

1. **Environment Variables:**
   - Use strong JWT secrets
   - Configure production database
   - Set NODE_ENV=production

2. **Security:**
   - Enable HTTPS
   - Use environment variables for sensitive data
   - Implement rate limiting
   - Set up proper CORS configuration

3. **Performance:**
   - Enable gzip compression
   - Use CDN for static assets
   - Implement caching strategies
   - Optimize images

4. **Database:**
   - Set up MongoDB with proper authentication
   - Create indexes for frequently queried fields
   - Implement backup strategies

### Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM node:14
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
EXPOSE 5000
CMD ["npm", "start"]
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, feature requests, or questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

## Acknowledgments

- Tailwind CSS for the excellent utility framework
- Font Awesome for the icon library
- The off-road community for inspiration

---

**Built with ❤️ for the off-road community**