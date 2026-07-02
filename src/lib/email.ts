// src/lib/email.ts

/**
 * Utilitaire de simulation d'envoi d'emails.
 * Si RESEND_API_KEY est présent dans l'environnement, on pourrait utiliser le SDK Resend.
 * Pour le moment, on affiche l'email dans la console pour la démo.
 */

export async function sendEmail(options: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) {
  console.log("\n==========================================")
  console.log("📧 SIMULATION D'ENVOI D'EMAIL")
  console.log("==========================================")
  console.log(`À      : ${options.to}`)
  console.log(`Sujet  : ${options.subject}`)
  if (options.text) {
    console.log(`Message: \n${options.text}`)
  } else if (options.html) {
    console.log(`Message (HTML): \n${options.html}`)
  }
  console.log("==========================================\n")
  
  // Simulation d'un appel réseau (ex: vers Resend)
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return { success: true }
}
