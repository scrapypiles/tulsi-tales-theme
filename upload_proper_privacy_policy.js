const fs = require('fs');
const https = require('https');
const token = fs.readFileSync('/home/acharya-kln/.openclaw/workspace/shopify_access_token.txt', 'utf8').trim();

let template = {
  "sections": {
    "main": {
      "type": "ayus-policy-content",
      "blocks": {
        "block_intro": {
          "type": "section",
          "settings": {
            "heading": "",
            "text": "<p>Tulsi Tales is committed to protecting your privacy. This policy explains what personal information we collect, how we use it, and what your rights are. Please read it carefully.</p>"
          }
        },
        "block_1": {
          "type": "section",
          "settings": {
            "heading": "1. Who We Are",
            "text": "<p>Tulsi Tales is an online Ayurvedic marketplace curating and selling authentic wellness products sourced from India. When we refer to \"we\", \"us\", or \"our\" in this policy, we mean Tulsi Tales.</p><p>For any privacy related questions, you can reach us at: tulsitales@gmail.com</p>"
          }
        },
        "block_2": {
          "type": "section",
          "settings": {
            "heading": "2. What Information We Collect",
            "text": "<p>We collect information in two ways — information you give us directly, and information collected automatically when you use our website.</p><p><strong>Information you give us directly:</strong></p><ul><li>Your name, email address, phone number, and delivery address when you place an order or create an account.</li><li>Payment information entered at checkout. We do not store your full card details — payments are processed securely through our payment provider.</li><li>Any messages or queries you send us by email or through our contact form.</li><li>Your email address if you sign up to our mailing list.</li></ul><p><strong>Information collected automatically:</strong></p><ul><li>Your IP address, browser type, and device information when you visit our website.</li><li>Pages you visit, how long you spend on them, and how you navigate the site — collected through cookies and analytics tools.</li><li>Referring websites or search terms that brought you to our site.</li></ul>"
          }
        },
        "block_3": {
          "type": "section",
          "settings": {
            "heading": "3. How We Use Your Information",
            "text": "<p>We use the information we collect for the following purposes:</p><ul><li><strong>To process and fulfil your orders:</strong> We use your name, address, and contact details to process payments, arrange delivery, and communicate with you about your order. This is necessary to complete your purchase.</li><li><strong>To provide customer support:</strong> If you contact us with a query, complaint, or return request, we use your information to respond and resolve the issue.</li><li><strong>To send order and account communications:</strong> We will send you transactional emails — order confirmations, dispatch notifications, and delivery updates. These are not marketing emails and you cannot opt out of them as they are necessary to your purchase.</li><li><strong>To send marketing communications:</strong> If you have opted in to our mailing list, we will send you occasional emails about new products, offers, and Ayurvedic content we think you will find useful. You can unsubscribe at any time by clicking the unsubscribe link in any email or by contacting us directly.</li><li><strong>To improve our website:</strong> We use anonymised analytics data to understand how people use our site, identify areas for improvement, and make the experience better for everyone.</li><li><strong>To comply with legal obligations:</strong> We may use or retain your information where required to do so by law — for example, for tax and accounting purposes.</li></ul>"
          }
        },
        "block_4": {
          "type": "section",
          "settings": {
            "heading": "4. Legal Basis for Processing Your Data",
            "text": "<p>We process your personal data on the following legal grounds:</p><ul><li><strong>Contract</strong> — processing is necessary to fulfil your order and deliver your products.</li><li><strong>Legitimate interests</strong> — for analytics, improving our website, and fraud prevention.</li><li><strong>Consent</strong> — for marketing emails, where you have opted in.</li><li><strong>Legal obligation</strong> — where we are required to retain or share data by law.</li></ul>"
          }
        },
        "block_5": {
          "type": "section",
          "settings": {
            "heading": "5. How We Share Your Information",
            "text": "<p>We do not sell your personal data to anyone. We only share your information with third parties where necessary to operate our business:</p><ul><li><strong>Courier and logistics partners:</strong> We share your name, address, and contact number with our shipping partners to fulfil and deliver your order.</li><li><strong>Payment processors:</strong> Your payment information is processed securely by our payment provider. We do not handle or store your full card details.</li><li><strong>Analytics and marketing tools:</strong> We use third party tools such as Google Analytics to understand website usage. These tools may collect anonymised data about your visit. We use email marketing platforms to manage our mailing list and send communications.</li><li><strong>Legal and regulatory authorities:</strong> We may disclose your information if required to do so by law, court order, or government authority.</li></ul><p>We require all third parties who process data on our behalf to handle it securely and in accordance with applicable data protection laws.</p>"
          }
        },
        "block_6": {
          "type": "section",
          "settings": {
            "heading": "6. Cookies",
            "text": "<p>Our website uses cookies — small text files stored on your device — to make the site work properly and to understand how it is being used.</p><ul><li><strong>Essential cookies</strong> are necessary for the website to function. They cannot be switched off.</li><li><strong>Analytics cookies</strong> help us understand how visitors interact with our site. These are anonymised and used only to improve the website.</li><li><strong>Marketing cookies</strong> may be used to show you relevant content or advertising. These are only set with your consent.</li></ul><p>You can manage your cookie preferences through your browser settings at any time. Please note that disabling certain cookies may affect how the website functions.</p>"
          }
        },
        "block_7": {
          "type": "section",
          "settings": {
            "heading": "7. Data Retention",
            "text": "<p>We retain your personal data only for as long as necessary for the purposes set out in this policy.</p><ul><li>Order and transaction data is retained for a minimum of 7 years for accounting and legal compliance purposes.</li><li>If you have an account with us and request its deletion, we will delete your personal data except where retention is required by law.</li><li>If you unsubscribe from our mailing list, we will remove you from future communications promptly. We may retain your email address on a suppression list to ensure we do not contact you again.</li></ul>"
          }
        },
        "block_8": {
          "type": "section",
          "settings": {
            "heading": "8. Data Security",
            "text": "<p>We take reasonable technical and organisational measures to protect your personal data from unauthorised access, loss, or misuse. Our website uses SSL encryption for all data transmitted between your browser and our site.</p><p>However, no method of transmission over the internet is completely secure. While we do our best to protect your information, we cannot guarantee absolute security.</p>"
          }
        },
        "block_9": {
          "type": "section",
          "settings": {
            "heading": "9. Your Rights",
            "text": "<p>Depending on where you are located, you may have the following rights regarding your personal data:</p><ul><li><strong>Right to access</strong> — You can request a copy of the personal data we hold about you.</li><li><strong>Right to correction</strong> — You can ask us to correct any inaccurate or incomplete information we hold about you.</li><li><strong>Right to deletion</strong> — You can ask us to delete your personal data where we no longer have a lawful reason to hold it.</li><li><strong>Right to restrict processing</strong> — You can ask us to limit how we use your data in certain circumstances.</li><li><strong>Right to data portability</strong> — You can request your data in a structured, commonly used format.</li><li><strong>Right to object</strong> — You can object to us processing your data for marketing purposes at any time.</li><li><strong>Right to withdraw consent</strong> — Where we rely on your consent to process your data, you can withdraw it at any time. This does not affect the lawfulness of processing carried out before withdrawal.</li></ul><p>To exercise any of these rights, please contact us at tulsitales@gmail.com. We will respond within 30 days.</p>"
          }
        },
        "block_10": {
          "type": "section",
          "settings": {
            "heading": "10. Children's Privacy",
            "text": "<p>Our website is not directed at children under the age of 18. We do not knowingly collect personal data from anyone under 18. If you believe a child has provided us with their personal data, please contact us and we will delete it promptly.</p>"
          }
        },
        "block_11": {
          "type": "section",
          "settings": {
            "heading": "11. Links to Other Websites",
            "text": "<p>Our website may contain links to third party websites. This privacy policy applies only to Tulsi Tales. We are not responsible for the privacy practices of any third party site and encourage you to read their privacy policies before providing any personal information.</p>"
          }
        },
        "block_12": {
          "type": "section",
          "settings": {
            "heading": "12. International Data Transfers",
            "text": "<p>If you are accessing our website from outside India, please be aware that your data may be transferred to and processed in India or in other countries where our service providers operate. We take steps to ensure that any such transfers are conducted in accordance with applicable data protection laws.</p>"
          }
        },
        "block_13": {
          "type": "section",
          "settings": {
            "heading": "13. Changes to This Policy",
            "text": "<p>We may update this privacy policy from time to time. Any changes will be posted on this page with the date of last update. We encourage you to review this policy periodically. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.</p>"
          }
        },
        "block_14": {
          "type": "section",
          "settings": {
            "heading": "14. Contact Us",
            "text": "<p>If you have any questions about this privacy policy, how we handle your data, or wish to exercise your rights, please contact us:</p><ul><li><strong>Email:</strong> tulsitales@gmail.com</li><li><strong>Instagram:</strong> @tulsitales</li></ul><p>We aim to respond to all privacy related queries within 2 business days.</p><p>This privacy policy applies to all personal data collected through the Tulsi Tales website and in connection with any purchases made through it.</p>"
          }
        }
      },
      "block_order": [
        "block_intro",
        "block_1",
        "block_2",
        "block_3",
        "block_4",
        "block_5",
        "block_6",
        "block_7",
        "block_8",
        "block_9",
        "block_10",
        "block_11",
        "block_12",
        "block_13",
        "block_14"
      ],
      "settings": {
        "title": "Privacy Policy",
        "tagline": "Tulsi Tales",
        "subtitle": "Last updated: April 2026",
        "text_color": "#ffffff",
        "overlay_color": "#000000",
        "overlay_opacity": 40
      }
    }
  },
  "order": ["main"]
};

let putData = JSON.stringify({ asset: { key: 'templates/page.policy.json', value: JSON.stringify(template, null, 2) } });

let req = https.request({
    hostname: '5iib0q-9y.myshopify.com', 
    path: `/admin/api/2024-01/themes/182982246700/assets.json`, 
    method: 'PUT', 
    headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(putData) }
}, res => {
    let body=''; res.on('data', c=>body+=c); res.on('end', () => console.log('Privacy Policy beautifully formatted JSON uploaded successfully.'));
});
req.write(putData); req.end();
