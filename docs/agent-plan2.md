# Customer Booking Pipeline & Frontend Routing

Currently, the application contains beautiful UI components for the Dashboards and Landing page, but the buttons do not lead anywhere because we have not built the pages that come _after_ you click them!

The user journey for a Customer requires a complete funnel: from searching, to viewing a specific hotel's details, to finally booking a room.

## User Review Required

Because these pages do not exist yet, we must create new routes and components to handle the customer experience. Please review this plan to confirm if you want a dedicated "Hotel Details" page or a "Booking Checkout" modal.

## Proposed Changes

### Feature: Customer Booking Funnel

#### [MODIFY] [App.tsx](file:///media/raavana/Modern_Raavana/HotelManagement/src/App.tsx)

- Add new React Router definitions for `/hotels` and `/hotels/:id`.
- Tie the new pages to the global `AnimatePresence` layout for smooth transitions.

#### [MODIFY] [HotelSearch.tsx](file:///media/raavana/Modern_Raavana/HotelManagement/src/features/customer/pages/HotelSearch.tsx)

- Connect the "Search Hotels" floating button to execute a navigation event (`navigate('/search')`) passing the selected Location, Dates, and Guests into the router state.

#### [NEW] [SearchResults.tsx](file:///media/raavana/Modern_Raavana/HotelManagement/src/features/customer/pages/SearchResults.tsx)

- A new page that acts as the listing directory.
- Reads search parameters and displays a grid of `HotelCard` components.
- Clicking a card navigates the user to the specific hotel details page.

#### [NEW] [HotelDetails.tsx](file:///media/raavana/Modern_Raavana/HotelManagement/src/features/customer/pages/HotelDetails.tsx)

- A highly premium page detailing a single hotel.
- Includes a Hero Image Gallery (using Unsplash).
- Presents a list of available Room Types (e.g., Deluxe King, Ocean View).
- A floating action bar / sticky side panel to select a room and click "Book Now".

#### [NEW] [BookingCheckout.tsx](file:///media/raavana/Modern_Raavana/HotelManagement/src/features/customer/pages/BookingCheckout.tsx)

- A final review step.
- Displays check-in/out dates, total price calculation, guest information form.
- Clicking "Confirm Booking" triggers a success animation (which will eventually hit the Spring Boot API, once Plan 1 is integrated).

## Open Questions

1. Should the Booking Checkout happen on a dedicated URL (e.g. `/checkout`), or should it be a sleek Slide-out Panel / Modal directly overlaying the `HotelDetails` page? (A slide-out panel tends to feel more modern).
2. For the "Add Property" button on the Manager/Admin Dashboard, do you want me to also build the "Create Property" form UI right now, or should we save that for when we connect the Spring Boot Backend?

## Verification Plan

### Manual Verification

- Launch the dev server, visit the landing page, and perform a search.
- Ensure the user is naturally funneled to `/search` list of hotels.
- Click a hotel and guarantee the `HotelDetails` page loads with premium imagery.
- Test the booking checkout flow without any dead buttons.
