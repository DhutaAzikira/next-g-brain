# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 AI Interview Platform that provides real-time video interviews with AI avatars, CV screening, and interview scheduling features.

## Essential Commands

```bash
# Development
pnpm dev          # Start development server with Turbopack

# Production
pnpm build        # Create production build
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint

# Add UI Components
pnpm shadcn:add   # Add new shadcn/ui components
```

## Architecture Overview

### Module-Based Structure
The codebase follows a vertical slice architecture where each feature is organized as a module:

```
src/modules/{feature}/
├── components/   # Feature-specific components
├── views/        # Page-level view components  
├── services/     # Server actions and API calls
└── schemas/      # Zod validation schemas
```

### Key Patterns

1. **Server Components & Actions**: Use Server Components by default. Create Server Actions in `services/` files for data mutations.

2. **Form Handling**: 
   - Define Zod schemas in `schemas/` files
   - Use Server Actions for form submission
   - Handle errors with field-level validation

3. **Styling**: 
   - Use Tailwind CSS v4 with custom CSS variables
   - Component variants with class-variance-authority (CVA)
   - Theme variables in `src/styles/variables.css`

4. **Authentication**: NextAuth.js with JWT strategy and Google OAuth. Session handling in `src/utils/auth.ts`.

5. **Real-time Features**: 
   - WebSocket connections for live communication
   - LiveKit for video/audio
   - HeyGen for AI avatars
   - Audio processing with Gladia

### Environment Configuration

Key environment variables needed:
- `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase connection
- `AUTH_SECRET` - NextAuth.js secret
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - Google OAuth
- WebSocket and API endpoints for real-time features

### File Upload Pattern

Use Supabase storage for file uploads:
- Client-side handling in `src/hooks/use-file-upload.ts`
- Storage utilities in `src/utils/supabase/image.ts`

### Testing Approach

Currently no test framework is configured. When adding tests, consider the module structure and create test files alongside the code.

## Important Considerations

- Always use Server Components unless client interactivity is needed
- Follow the existing module structure when adding new features
- Maintain TypeScript strict mode compliance
- Use the established patterns for forms, authentication, and real-time features
- Environment variables are critical - check `.env.example` for required configuration