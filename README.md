# Advanced Booking Application with AI Assistant

A modern, feature-rich service booking platform built with Next.js, TypeScript, and Tailwind CSS. This application allows users to browse salon services, book appointments, manage bookings, and interact with an AI-powered assistant for guidance and support.

## 🚀 Features

### Core Functionality
- **Service Browsing**: Browse comprehensive salon services with detailed information
- **Advanced Search & Filtering**: Filter services by category, price range, ratings, and keywords
- **Real-time Booking**: Select dates and time slots with live availability
- **Booking Management**: View, manage, and cancel appointments
- **AI Assistant**: Intelligent chatbot for booking guidance and customer support

### Technical Features
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **TypeScript**: Full type safety for better development experience
- **Component Architecture**: Modular, reusable React components
- **API Integration**: Structured API layer with mock data
- **State Management**: Efficient state management with custom hooks

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom components
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns library

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-js-tailwind-css
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
react-js-tailwind-css/
├── app/                    # Next.js App Router pages
│   ├── booking/           # Booking flow pages
│   │   └── [id]/         # Dynamic service booking
│   ├── chat/              # AI assistant page
│   ├── my-bookings/       # User bookings management
│   └── page.tsx           # Home page
├── components/             # Reusable React components
│   ├── ui/               # Base UI components
│   ├── ai-chatbot.tsx    # AI assistant component
│   ├── floating-chat.tsx  # Floating chat widget
│   ├── header.tsx        # Navigation header
│   └── services-listing.tsx # Services grid
├── hooks/                 # Custom React hooks
│   ├── use-bookings.ts   # Booking management hook
│   └── use-services.ts   # Services data hook
├── lib/                   # Utility libraries
│   ├── api.ts            # API integration layer
│   └── utils.ts          # Utility functions
└── styles/               # Global styles
```

## 🎯 Application Flow

### 1. Service Discovery
- Users land on the home page showing all available services
- Services can be filtered by category, price, rating, and search terms
- Each service card displays key information: name, salon, rating, price, duration

### 2. Service Details & Booking
- Clicking a service navigates to the detailed booking page
- Users can select their preferred date and view available time slots
- Real-time availability updates with visual feedback
- Booking summary shows total cost and appointment details

### 3. Booking Confirmation
- Users provide contact information for the booking
- Confirmation page displays booking details and success message
- Users can navigate to "My Bookings" to manage appointments

### 4. Booking Management
- "My Bookings" page shows upcoming and past appointments
- Users can cancel confirmed bookings (with status updates)
- Booking cards display service details, date, time, and status

### 5. AI Assistant Integration
- Dedicated chat page for AI-powered assistance
- Floating chat widget for quick access from any page
- AI helps with service recommendations, booking guidance, and FAQs
- Context-aware responses based on user queries

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# AI API Configuration (optional - using mock responses by default)
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Customization

#### Branding
Update the brand name and logo in `components/header.tsx`:
```tsx
<span className="text-xl font-bold text-primary hidden sm:inline">
  YOUR BRAND NAME
</span>
```

#### Color Scheme
Modify the accent color in `tailwind.config.ts`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#your-color',
          // ... other shades
        }
      }
    }
  }
}
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

Key responsive features:
- Collapsible navigation menu on mobile
- Grid layouts that adapt to screen size
- Touch-friendly interface elements
- Optimized chat experience for all devices

## 🤖 AI Assistant

### Integration Options

#### Option 1: Mock Responses (Default)
The application includes intelligent mock responses that handle common booking queries:
- Service recommendations
- Booking guidance
- FAQ responses
- Cancellation instructions

#### Option 2: Real AI Integration
To integrate with a real AI service:

1. **OpenAI Integration**
   ```ts
   // lib/api.ts
   import { OpenAI } from 'openai'
   
   const openai = new OpenAI({
     apiKey: process.env.OPENAI_API_KEY
   })
   ```

2. **Google Gemini Integration**
   ```ts
   // lib/api.ts
   import { GoogleGenerativeAI } from '@google/generative-ai'
   
   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
   ```

### AI Capabilities
- **Booking Guidance**: Step-by-step booking assistance
- **Service Recommendations**: Personalized service suggestions
- **Availability Queries**: Real-time slot information
- **FAQ Handling**: Common questions and troubleshooting
- **Context Awareness**: Maintains conversation context

## 🧪 Testing

### Running Tests
```bash
npm run test
# or
yarn test
```

### Building for Production
```bash
npm run build
# or
yarn build
```

### Production Deployment
```bash
npm start
# or
yarn start
```

## 📊 Mock Data Structure

### Service Object
```typescript
interface Service {
  id: string
  name: string
  category: string
  salon: string
  location: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  duration: number // in minutes
  description: string
  isFavorite?: boolean
}
```

### Booking Object
```typescript
interface Booking {
  id: string
  serviceId: string
  serviceName: string
  salon: string
  date: string
  time: string
  price: number
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  createdAt: string
}
```

## 🔍 API Integration

The application uses a structured API layer in `lib/api.ts`:

### Available Functions
- `getServices()`: Fetch all available services
- `getServiceById(id)`: Get specific service details
- `getTimeSlots(date)`: Get available time slots for a date
- `getBookings()`: Get user's bookings
- `createBooking(booking)`: Create new booking
- `cancelBooking(id)`: Cancel existing booking
- `sendChatMessage(message)`: Send message to AI assistant

### Extending the API
To connect to a real backend:

1. Replace mock functions with actual API calls
2. Add error handling for network requests
3. Implement authentication and authorization
4. Add data validation and sanitization

## 🎨 UI Components

The application uses a component-based architecture with:

### Base Components (`components/ui/`)
- Form inputs, buttons, cards, modals
- Built with Radix UI for accessibility
- Consistent styling with Tailwind CSS

### Feature Components
- **ServicesListing**: Service grid with filtering
- **BookingForm**: Multi-step booking process
- **AIChatbot**: Interactive chat interface
- **BookingCard**: Booking display component

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component for lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Component Memoization**: React.memo for expensive components
- **State Management**: Efficient state updates with custom hooks

## 🔒 Security Considerations

- **Input Validation**: Form validation with Zod schemas
- **XSS Prevention**: Proper data sanitization
- **CSRF Protection**: Next.js built-in CSRF protection
- **Secure Headers**: Security headers configured by default

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature description'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the FAQ section in the AI assistant
- Review the documentation and code comments

## 🎯 Future Enhancements

### Planned Features
- **User Authentication**: Login/registration system
- **Payment Integration**: Stripe or other payment processors
- **Email Notifications**: Booking confirmations and reminders
- **Service Reviews**: User rating and review system
- **Multi-language Support**: Internationalization
- **Admin Dashboard**: Service and booking management
- **Advanced Analytics**: Business intelligence features

### Technical Improvements
- **Database Integration**: PostgreSQL or MongoDB
- **Real-time Updates**: WebSocket integration
- **Progressive Web App**: PWA capabilities
- **Advanced Search**: Full-text search with filters
- **A/B Testing**: Feature flag system

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
