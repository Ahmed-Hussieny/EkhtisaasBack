export const SendEmailFromHomePage =({ country , educationLevel , fullName,specialization })=>{
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New User Registration</title>
    <style>
        /* CSS for styling the email */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #007bff;
            color: #fff;
            text-align: center;
            padding: 10px 0;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px 0;
        }
        .content p {
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.8em;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New User Registration</h2>
        </div>
        <div class="content">
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Country:</strong> ${country}</p>
            <p><strong>Education Level:</strong> ${educationLevel}</p>
            <p><strong>Specialization:</strong> ${specialization}</p>
        </div>
        <div class="footer">
            <p>Please take necessary actions as per your procedures.</p>
            <p>Thank you.</p>
        </div>
    </div>
</body>
</html>
`
}