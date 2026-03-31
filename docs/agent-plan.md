# Goal

Build a premium, high-fidelity frontend UI for the Hotel Management System based on the provided schema, core requirements, and shadcn/ui. The UI will connect to a Java Spring Boot backend. The primary objective is to deliver a seamless, responsive, and visually stunning Customer Enablement portal, alongside necessary Manager and Admin dashboards.

# Affected Files

- `src/App.tsx` & `src/main.tsx` (Routing & Layout wrappers)
- `src/features/auth/` (Login, Register pages)
- `src/features/customer/`
  - `components/HotelSearch.tsx` (Location, dates, price range, amenities filters)
  - `components/HotelList.tsx` (Centralized portal for hotels, categories, pricing, facilities)
  - `components/BookingFlow.tsx` (Secure & efficient booking process)
- `src/features/manager/` (Dashboard for Hotel creation, Room Types, Facilities, Inventory)
- `src/features/admin/` (Dashboard for Document Verification, Hotel Approval)
- `src/components/ui/` (shadcn components)
- `src/lib/` (API client configured for Spring Boot REST endpoints)

# Core Features Implementation (Phase 1)

1. **Routing Setup**: Install `react-router-dom` and set up role-based routing (`CUSTOMER`, `MANAGER`, `ADMIN`).
2. **Design System**: Scaffold shadcn/ui baseline components. Establish a modern, vibrant color palette with smooth micro-animations tailored for a premium hotel booking experience.
3. **Customer Enablement Portal**
   - **Centralized Dashboard**: A visually striking landing page displaying featured hotels, room categories, pricing, and facility icons.
   - **Advanced Search & Filter**: Interactive UI to filter by location, check-in/out dates, price slider, and amenity checkboxes.
   - **Booking Interface**: A structured, multi-step booking process with clear availability indicators, ensuring a secure and efficient user flow.
4. **Manager & Admin Dashboards**
   - **Manager**: UI to manage hotel details, room mapping, facility toggles, and document uploads for verification.
   - **Admin**: Dedicated table/grid view to review and verified uploaded documents (GST, ID) to activate hotels.

# Stretch Features Implementation (Phase 2 - Future References)

1. **Customer Dashboard Enhancements**:
   - **Booking History**: A dedicated view for past and upcoming bookings, featuring a "Quick Rebook" button for authenticated users.
   - **Promotions UI**: Integration in the booking checkout for inputting discount codes, applying loyalty rewards, and highlighting seasonal offers.
   - **Confirmation Screens**: Detailed success pages reflecting the email confirmation (showing reservation number, total price, and applied discounts).

# Rollback Strategy

If any generation fails or the UI breaks significantly, discard changes in Git (`git checkout -- src/`) or run `git reset --hard` to revert to baseline state prior to agent execution. All tasks will be built incrementally within feature folders for isolated testing.
