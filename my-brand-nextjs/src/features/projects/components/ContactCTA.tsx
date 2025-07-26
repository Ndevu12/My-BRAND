import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import { navigateToContactForm } from "../utils/navigation";
import {
  MY_LINKEDIN_PROFILE_URL,
  MY_CONTACT_EMAIL,
  MY_CV_DOWNLOAD_URL,
} from "@/lib/constants";

export function ContactCTA() {
  const handleDownloadCV = () => {
    window.open(MY_CV_DOWNLOAD_URL, "_blank");
  };
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-400/10 via-transparent to-purple-400/10 dark:from-yellow-400/5 dark:via-transparent dark:to-purple-400/5 rounded-2xl border border-yellow-400/20 dark:border-yellow-400/10">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-400/20 dark:bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/40 dark:border-yellow-400/20 rounded-full px-6 py-3 mb-6">
          <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full animate-pulse" />
          <Typography
            variant="small"
            className="text-yellow-600 dark:text-yellow-400 font-medium"
          >
            Ready to Collaborate
          </Typography>
        </div>

        {/* Title */}
        <Typography variant="h2" className="mb-6 text-gray-900 dark:text-white">
          Have a Project in Mind?
        </Typography>

        {/* Description */}
        <Typography
          variant="p"
          className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto text-lg"
        >
          I'm always excited to work on new challenges and bring innovative
          ideas to life. Let's discuss how we can create something amazing
          together.
        </Typography>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigateToContactForm()}
            className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-yellow-500/25 transform hover:scale-105 transition-all duration-300 border-0"
          >
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.451L3 21l2.451-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
                />
              </svg>
              <span>Start a Conversation</span>
            </div>
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleDownloadCV}
            className="group px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2 group-hover:bounce transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Download CV</span>
            </div>
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Typography
            variant="small"
            className="text-gray-500 dark:text-gray-400 mb-4"
          >
            Or reach me directly:
          </Typography>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href={`mailto:${MY_CONTACT_EMAIL}`}
              className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"
            >
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/20 transition-colors duration-300">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <span className="font-medium">{MY_CONTACT_EMAIL}</span>
            </a>
            <a
              href={`${MY_LINKEDIN_PROFILE_URL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-300 transform hover:scale-110"
            >
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:bg-yellow-100 dark:group-hover:bg-yellow-900/20 transition-colors duration-300">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
