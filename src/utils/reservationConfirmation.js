export const confirmReservation = ({ name,date, startTime, endTime  }) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reservation Confirmation</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #2c3e50;
                    background-color: #f4f4f4;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 10px;
                    background-color: #ffffff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    color: #3498db;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 10px;
                }
                p {
                    margin: 0 0 15px;
                }
                .details {
                    background-color: #ecf0f1;
                    padding: 10px;
                    border-radius: 5px;
                }
                .details p {
                    margin: 5px 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Reservation Confirmation</h2>
                <p>Dear ${name},</p>
                <p>We are pleased to inform you that your reservation has been successfully booked.</p>
                <div class="details">
                    <p><strong>Reservation Date:</strong> ${date}</p>
                    <p><strong>Time:</strong> from ${startTime} to ${endTime}</p>
                </div>
                <p>Thank you for choosing our service. We look forward to serving you.</p>
                <p>Best regards,</p>
                <p>Rescue Wheels</p>
            </div>
        </body>
        </html>
    `;
};
