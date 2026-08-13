import { useEffect, useRef, useState, type FormEvent } from 'react'
import ArrowIcon from './ArrowIcon'

type JobApplicationModalProps = {
  isOpen: boolean
  onClose: () => void
}

type SubmissionStatus = 'idle' | 'submitting' | 'success'

const maxCvSize = 10 * 1024 * 1024
const acceptedCvTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]
const acceptedCvExtensions = ['pdf', 'doc', 'docx']

export default function JobApplicationModal({
  isOpen,
  onClose,
}: JobApplicationModalProps) {
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [fileName, setFileName] = useState('')
  const [fileError, setFileError] = useState('')
  const [submissionError, setSubmissionError] = useState('')
  const submittedRef = useRef(false)
  const submissionTimerRef = useRef<number | undefined>(undefined)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && status !== 'submitting') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose, status])

  useEffect(() => {
    if (isOpen) return
    setStatus('idle')
    setFileName('')
    setFileError('')
    setSubmissionError('')
    submittedRef.current = false
    if (submissionTimerRef.current) window.clearTimeout(submissionTimerRef.current)
    formRef.current?.reset()
  }, [isOpen])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget
    const fileInput = form.elements.namedItem('attachment') as HTMLInputElement | null
    const cv = fileInput?.files?.[0]

    if (!cv) {
      event.preventDefault()
      setFileError('Please attach your CV before submitting.')
      return
    }

    const cvExtension = cv.name.split('.').pop()?.toLowerCase() ?? ''
    if (!acceptedCvTypes.includes(cv.type) && !acceptedCvExtensions.includes(cvExtension)) {
      event.preventDefault()
      setFileError('Please upload a PDF, DOC, or DOCX file.')
      return
    }

    if (cv.size > maxCvSize) {
      event.preventDefault()
      setFileError('Your CV must be 10 MB or smaller.')
      return
    }

    setFileError('')
    setSubmissionError('')
    submittedRef.current = true
    setStatus('submitting')
    submissionTimerRef.current = window.setTimeout(() => {
      submittedRef.current = false
      setStatus('idle')
      setSubmissionError(
        'We could not confirm the upload. Please check your connection and submit again.',
      )
    }, 30000)
  }

  const handleSubmissionResponse = () => {
    if (!submittedRef.current) return
    submittedRef.current = false
    if (submissionTimerRef.current) window.clearTimeout(submissionTimerRef.current)
    formRef.current?.reset()
    setFileName('')
    setStatus('success')
  }

  if (!isOpen) return null

  return (
    <div
      className="job-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="job-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && status !== 'submitting') onClose()
      }}
    >
      <div className="job-modal-panel">
        <button
          type="button"
          className="job-modal-close"
          aria-label="Close application form"
          onClick={onClose}
          disabled={status === 'submitting'}
        >
          &times;
        </button>

        {status === 'success' ? (
          <div className="job-application-success" role="status" aria-live="polite">
            <div className="job-success-mark" aria-hidden="true">
              <svg viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" />
                <path d="M19 33.5 28 42l18-20" />
              </svg>
            </div>
            <p className="eyebrow">Application submitted</p>
            <h2>Thank you for applying.</h2>
            <p className="body">
              Your Admin Assistant application and CV have been sent successfully. We&apos;ll
              review your details and contact you if you&apos;re shortlisted.
            </p>
            <button type="button" className="job-success-button" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="job-modal-heading">
              <p className="eyebrow">We&apos;re Hiring</p>
              <h2 id="job-modal-title">Apply for Admin Assistant</h2>
              <p className="body">
                Complete the form below and attach your CV. Fields marked with an asterisk
                are required.
              </p>
            </div>

            <form
              ref={formRef}
              className="job-application-form"
              action="https://formsubmit.co/m.usidamen@gmail.com"
              method="POST"
              encType="multipart/form-data"
              target="job-application-response"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="_subject" value="New Admin Assistant Application" />
              <input type="hidden" name="_cc" value="cggguuup@gmail.com" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="position" value="Admin Assistant" />
              <input
                className="job-honeypot"
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="form-group">
                <label className="form-label" htmlFor="application-name">
                  Full name *
                </label>
                <input
                  className="form-input"
                  id="application-name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="application-email">
                  Email address *
                </label>
                <input
                  className="form-input"
                  id="application-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="application-phone">
                  Phone number *
                </label>
                <input
                  className="form-input"
                  id="application-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="application-location">
                  Location
                </label>
                <input
                  className="form-input"
                  id="application-location"
                  name="location"
                  type="text"
                  autoComplete="address-level2"
                  placeholder="City or area"
                />
              </div>

              <div className="form-group job-form-wide">
                <label className="form-label" htmlFor="application-message">
                  Why are you a good fit? *
                </label>
                <textarea
                  className="form-textarea"
                  id="application-message"
                  name="application_message"
                  rows={4}
                  placeholder="Tell us briefly about your relevant experience and strengths."
                  required
                />
              </div>

              <div className="form-group job-form-wide">
                <label className="form-label" htmlFor="application-cv">
                  Upload CV *
                </label>
                <label className="job-file-upload" htmlFor="application-cv">
                  <span className="job-file-icon" aria-hidden="true">
                    +
                  </span>
                  <span>
                    <strong>{fileName || 'Choose your CV'}</strong>
                    <small>PDF, DOC, or DOCX — maximum 10 MB</small>
                  </span>
                </label>
                <input
                  className="job-file-input"
                  id="application-cv"
                  name="attachment"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  aria-describedby="application-cv-help"
                  onChange={(event) => {
                    const cv = event.target.files?.[0]
                    setFileName(cv?.name ?? '')
                    setFileError('')
                  }}
                />
                <span
                  id="application-cv-help"
                  className={fileError ? 'job-file-error' : 'job-file-help'}
                >
                  {fileError || 'Your CV will be securely attached to the application email.'}
                </span>
              </div>

              <button
                type="submit"
                className="btn job-submit-button"
                disabled={status === 'submitting'}
              >
                <span className="btn-label">
                  <span className="btn-text-top">
                    {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                  </span>
                  <span className="btn-text-bottom">
                    {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                  </span>
                </span>
                <span className="btn-icon">
                  <ArrowIcon />
                </span>
              </button>
              {submissionError && (
                <p className="job-submission-error" role="alert">
                  {submissionError}
                </p>
              )}
            </form>
          </>
        )}

        <iframe
          className="job-response-frame"
          name="job-application-response"
          title="Application submission response"
          onLoad={handleSubmissionResponse}
        />
      </div>
    </div>
  )
}
