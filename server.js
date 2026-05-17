/**
 * Shope E-commerce Server
 * Express server with Nodemailer for order email notifications
 */

const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

// ============================================
// Environment Validation
// ============================================

const requiredEnvVars = ['GMAIL_EMAIL', 'GMAIL_APP_PASSWORD'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    console.error('Error: Missing required environment variables:');
    missingEnvVars.forEach(envVar => console.error(`  - ${envVar}`));
    console.error('\nPlease copy .env.example to .env and add your Gmail credentials.');
    console.error('Note: Use an App Password, not your regular Gmail password.');
    process.exit(1);
}

// ============================================
// Express Server Setup
// ============================================

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Static file serving
app.use(express.static(path.join(__dirname)));

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// Nodemailer Transporter Configuration
// ============================================

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // STARTTLS
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verify transporter on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Connection Error:', error.message);
    } else {
        console.log('SMTP Server is ready to take our messages');
    }
});

// ============================================
// Email Sending Function
// ============================================

/**
 * Send order confirmation email
 * @param {Object} orderData - Order information
 * @param {string} orderData.customerName - Customer's name
 * @param {string} orderData.customerEmail - Customer's email
 * @param {string} orderData.customerPhone - Customer's phone number
 * @param {string} orderData.shippingAddress - Delivery address
 * @param {Array} orderData.items - Array of ordered items
 * @param {number} orderData.total - Total order amount
 * @returns {Promise<Object>} - Nodemailer send result
 */
async function sendOrderEmail(orderData) {
    const { customerName, customerEmail, customerPhone, shippingAddress, items, total } = orderData;

    // Generate HTML for order items
    const itemsHtml = items.map(item => `
        <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">
                <strong>${item.name}</strong><br>
                <small style="color: #666;">Category: ${item.category}</small>
            </td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    // Build HTML email template
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Order Received - Shope</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 28px;">🛒 New Order Received!</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Shope E-commerce Order Notification</p>
            </div>

            <div style="background: #f9f9f9; padding: 25px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #667eea; margin-top: 0;">Order Details</h2>

                <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; margin: 20px 0;">
                    <thead>
                        <tr style="background: #667eea; color: white;">
                            <th style="padding: 12px; text-align: left;">Product</th>
                            <th style="padding: 12px; text-align: left;">Info</th>
                            <th style="padding: 12px; text-align: center;">Qty</th>
                            <th style="padding: 12px; text-align: right;">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                    <tfoot>
                        <tr style="background: #f5f5f5;">
                            <td colspan="3" style="padding: 15px; text-align: right; font-weight: bold;">Total:</td>
                            <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px; color: #667eea;">$${total.toFixed(2)}</td>
                        </tr>
                    </tfoot>
                </table>

                <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
                    <h3 style="color: #667eea; margin-top: 0;">Customer Information</h3>
                    <p style="margin: 8px 0;"><strong>Name:</strong> ${customerName}</p>
                    <p style="margin: 8px 0;"><strong>Email:</strong> ${customerEmail}</p>
                    <p style="margin: 8px 0;"><strong>Phone:</strong> ${customerPhone || 'Not provided'}</p>
                    <p style="margin: 8px 0;"><strong>Shipping Address:</strong><br>${shippingAddress || 'Not provided'}</p>
                </div>

                <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                    <p style="color: #888; font-size: 14px; margin: 0;">
                        This is an automated order notification from <strong>Shope</strong> E-commerce<br>
                        Order received at: ${new Date().toLocaleString()}
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;

    // Plain text version
    const textContent = `
New Order Received - Shope E-commerce

CUSTOMER INFORMATION
--------------------
Name: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone || 'Not provided'}
Shipping Address: ${shippingAddress || 'Not provided'}

ORDER ITEMS
-----------
${items.map(item => `- ${item.name} (${item.category}): ${item.quantity} x $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

TOTAL: $${total.toFixed(2)}

Order received at: ${new Date().toLocaleString()}
    `;

    const mailOptions = {
        from: `"Shope Orders" <${process.env.GMAIL_EMAIL}>`,
        to: process.env.GMAIL_EMAIL, // Send to own email
        subject: `🛒 New Order from ${customerName} - Total: $${total.toFixed(2)}`,
        text: textContent,
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Order email sent successfully!');
        console.log('Message ID:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending order email:', error.message);
        throw error;
    }
}

// ============================================
// API Routes
// ============================================

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'Shope E-commerce Server'
    });
});

// Order submission endpoint
app.post('/api/orders', async (req, res) => {
    try {
        const { customerName, customerEmail, customerPhone, shippingAddress, items, total } = req.body;

        // Validate required fields
        if (!customerName || !customerEmail || !items || !total) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: customerName, customerEmail, items, total'
            });
        }

        // Validate items array
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Items array is required and cannot be empty'
            });
        }

        // Send order email
        const emailResult = await sendOrderEmail({
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress,
            items,
            total
        });

        res.status(201).json({
            success: true,
            message: 'Order placed successfully!',
            orderId: `ORD-${Date.now()}`,
            emailSent: emailResult.success
        });

    } catch (error) {
        console.error('Order processing error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process order. Please try again.'
        });
    }
});

// ============================================
// Server Start
// ============================================

app.listen(PORT, () => {
    console.log('===========================================');
    console.log('🛒 Shope E-commerce Server');
    console.log('===========================================');
    console.log(`Server running on: http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('===========================================');
});

module.exports = app;