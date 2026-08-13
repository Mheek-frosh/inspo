import { StandaloneFooter } from '../components/CTASection'

export default function PrivacyPage() {
  return (
    <>
      <main className="legal-page" data-nav-theme="light">
        <div className="legal-content">
          <p className="eyebrow">Privacy</p>
          <h1>Privacy Policy</h1>
          <p className="legal-meta">Last updated: August 13, 2026</p>

          <h2>Information you provide</h2>
          <p className="body">
            When you contact Biomusclepilates or book a session, you may provide details such
            as your name, email address, phone number, appointment preferences, and message.
          </p>

          <h2>How your information is used</h2>
          <p className="body">
            We use this information to respond to enquiries, arrange and manage sessions,
            send booking confirmations and reminders, and provide the services you request.
          </p>

          <h2>Booking and form providers</h2>
          <p className="body">
            Session bookings are processed through Breely. Contact enquiries are delivered
            through FormSubmit. Information submitted through these services is also subject
            to their respective privacy practices.
          </p>

          <h2>Contact</h2>
          <p className="body">
            For privacy questions or requests, email{' '}
            <a href="mailto:m.usidamen@gmail.com">m.usidamen@gmail.com</a>.
          </p>
        </div>
      </main>
      <StandaloneFooter />
    </>
  )
}
