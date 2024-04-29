window.onload = function() {
    displayUserInfo();
};

function displayUserInfo() {
    let userName = sessionStorage.getItem("name");}

document.addEventListener("DOMContentLoaded", function() {
    let domainScores = JSON.parse(localStorage.getItem('domainScores')) || {};
    let percentageScores = JSON.parse(localStorage.getItem('percentageScores')) || {};
    let subdomainScores = JSON.parse(localStorage.getItem('subdomainScores')) || {};

    if (Object.keys(domainScores).length === 0 || Object.keys(percentageScores).length === 0) {
        displayError("No quiz data found. Please ensure you have completed the quiz.");
    } else {
        displayDomainScores(domainScores, subdomainScores);
        displayPercentageScores(percentageScores);
        displaySubdomainScores(subdomainScores);
        drawPercentageChart(percentageScores);
        displayDomainDetails(percentageScores);
        displayEmotionalAwarenessDetails(subdomainScores['EmotionalAwareness']);
        drawSubdomainCharts(subdomainScores['Personality'], subdomainScores['EmotionalAwareness']);
        displayJobRecommendation(subdomainScores['Personality']);
    }
    
});


function displayDomainScores(domainScores, subdomainScores) {
    const domainScoresContainer = document.getElementById("domain-scores");
    domainScoresContainer.innerHTML = "<h2>Your Profile Summary</h2><p>This section offers a summary of your scores. However, the total score for each section is not mentioned because they represent just numbers. What truly matters is your unique abilities. We encourage you to explore the subdomains of Emotional Quotient and Personality that reflects who you are. </p>";
    
    for (let domain in domainScores) {
        let scoreContent = `${domain}: ${domainScores[domain]}`;
        if (domain === "EmotionalAwareness" || domain === "Personality") {
            let highestSubdomain = findHighestScoringSubdomain(subdomainScores[domain].subdomains);
            scoreContent = `${domain}: ${highestSubdomain.name} (Highest Subdomain)`;
        }
        let domainScoreElement = document.createElement("p");
        domainScoreElement.textContent = scoreContent;
        domainScoresContainer.appendChild(domainScoreElement);
    }
}

function displayPercentageScores(percentageScores) {
    const percentageScoresContainer = document.getElementById("percentage-scores");
    percentageScoresContainer.innerHTML = "<h2>Identify Your Strengths</h2><p>This section details your greatest strengths, highlighting areas where you excel and should focus on further developing your skills. Each category represents a unique aspect of your capabilities, providing a clear direction for where to channel your efforts for personal growth and skill enhancement. Here’s a closer look at where you stand:</p>";
    for (let domain in percentageScores) {
        let percentageScoreElement = document.createElement("p");
        percentageScoreElement.textContent = `${domain}: ${percentageScores[domain].toFixed(2)}%`;
        percentageScoresContainer.appendChild(percentageScoreElement);
    }
}

function drawPercentageChart(percentageScores) {
    const ctx = document.getElementById('percentage-chart').getContext('2d');
    const labels = Object.keys(percentageScores);
    const data = {
        labels: labels,
        datasets: [{
            label: 'Percentage Scores',
            data: labels.map(label => percentageScores[label]),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)'
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    };

    new Chart(ctx, config);
}

function displayDomainDetails(percentageScores) {
    const domainDetailsContainer = document.getElementById("domain-details");
    domainDetailsContainer.innerHTML = "<h2>Let's Understand your Key SKILL</h2>";
    const highestScoringDomain = findHighestScoringDomain(percentageScores);

    // Setup the text content
    let content = document.createElement("p");
    content.textContent = highestScoringDomain.description;
    domainDetailsContainer.appendChild(content);

    // Image container for better control
    let imgContainer = document.createElement("div");
    imgContainer.style.display = "flex";  // Images side by side
    imgContainer.style.justifyContent = "space-evenly";  // Even spacing
    imgContainer.style.alignItems = "center";  // Align images vertically

    // Retrieve and append each image
    const images = getDomainImage(highestScoringDomain.name);
    images.forEach(imgSrc => {
        let img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Skill Image";
        img.className = "round-image";  // Use class for styling
        imgContainer.appendChild(img);
    });

    domainDetailsContainer.appendChild(imgContainer);
}



function findHighestScoringDomain(scores) {
    let highestDomains = [];
    let highestScore = -Infinity;

    for (const [name, score] of Object.entries(scores)) {
        if (score > highestScore) {
            highestDomains = [{ name, score }];
            highestScore = score;
        } else if (score === highestScore) {
            highestDomains.push({ name, score });
        }
    }

    const selectedDomain = highestDomains[Math.floor(Math.random() * highestDomains.length)];
    selectedDomain.description = getDomainDescription(selectedDomain.name);
    selectedDomain.image = getDomainImage(selectedDomain.name);
    return selectedDomain;
}

function findHighestScoringSubdomain(subdomains) {
    let highestSubdomains = [];
    let highestScore = -Infinity;

    for (const [name, score] of Object.entries(subdomains)) {
        if (score > highestScore) {
            highestSubdomains = [{ name, score }];
            highestScore = score;
        } else if (score === highestScore) {
            highestSubdomains.push({ name, score });
        }
    }

    return highestSubdomains[Math.floor(Math.random() * highestSubdomains.length)];
}

function getDomainDescription(domain) {
    switch (domain) {
        case "Arithmetic":
            return "Your logical-mathematical intelligence is a powerful asset. This skill enables you to excel in environments that require sharp analytical thinking and problem-solving abilities. It's foundational for careers in fields like mathematics, engineering, science, and technology—areas that are pivotal in driving societal progress and innovation. With this type of intelligence, you can easily identify patterns, understand complex concepts, and devise strategies to solve challenging problems. You are equipped to lead scientific experiments and technological advancements that expand human knowledge. This skill not only enhances your cognitive abilities but also positions you as a key contributor to collective achievements, empowering you to approach life's challenges with precision and confidence.";
            
        case "SpatialReasoning":
            return "Your spatial reasoning or spatial intelligence is a valuable skill that allows you to imagine, visualize, and differentiate objects in both two and three dimensions. This ability is crucial for professions in architecture, engineering, art, and design, where visualizing spaces and forms accurately is key to success. With strong spatial intelligence, you can excel in tasks that require the manipulation of physical spaces or understanding complex visual details.";
        case "Vocabulary":
            return "Your linguistic intelligence shines through your love of words, whether in debate or storytelling. This skill empowers you to articulate ideas clearly, persuade effectively, and craft stories that captivate. Essential for roles in writing, public speaking, education, and law, your linguistic ability allows you to excel in any field that values communication and expression. People with strong linguistic skills are often great debaters and storytellers, adept at using language to engage and influence others. This form of intelligence not only enhances personal expression but also enriches interactions and connections with others.";
        case "CreativeExpression":
            return "Your creative expression is a testament to your ability to innovate and think outside the box. Creativity is essential in navigating complex problems and devising unique, non-linear solutions. This skill is invaluable in fields like art, design, marketing, and technology, where innovation drives success. A creative mind allows you to see beyond conventional solutions, opening doors to new ideas and possibilities. This ability not only makes you an effective problem solver but also enhances your capacity to inspire and bring about change in dynamic environments.";
        default:
            return "No specific details available.";
    }
}

function getDomainImage(domain) {
    switch (domain) {
        case "Arithmetic":
            return ["Skillimage11.png", "Skillimage12.png", "Skillimage13.png", "Skillimage14.png"];
        case "SpatialReasoning":
            return ["Skillimage21.png", "Skillimage22.png", "Skillimage23.png", "Skillimage24.png"];
        case "Vocabulary":
            return ["Skillimage31.png", "Skillimage32.png", "Skillimage33.png", "Skillimage34.png"];
        case "CreativeExpression":
            return ["Skillimage41.png", "Skillimage42.png", "Skillimage43.png", "Skillimage44.png"];
        default:
            return [];
    }
}


// Continue with the rest of your functions here...
function displaySubdomainScores(subdomainScores) {
    const subdomainScoresContainer = document.getElementById("subdomain-scores");
    subdomainScoresContainer.innerHTML = "<h2>A Deep Analysis of your Personality Type and Emotional Quotient</h2><p>This section offers a detailed analysis of your Personality Type and Emotional Quotient, highlighting your interactions and emotional management. The scores across various dimensions reveal your strengths and areas for growth, helping you harness and enhance your capabilities. Here are your detailed results:</p>";

    for (let domain in subdomainScores) {
        let content = `<h3>${domain}</h3><p>Total: ${subdomainScores[domain].total}</p>`;
        for (let subdomain in subdomainScores[domain].subdomains) {
            content += `<p>${subdomain}: ${subdomainScores[domain].subdomains[subdomain]}</p>`;
        }
        let domainElement = document.createElement("div");
        domainElement.innerHTML = content;
        subdomainScoresContainer.appendChild(domainElement);
    }
}

function drawSubdomainCharts(personalityScores, emotionalAwarenessScores) {
    drawBarChart(personalityScores, 'Personality', 'personality-chart');
    drawBarChart(emotionalAwarenessScores, 'Emotional Awareness', 'emotional-awareness-chart');
}

function drawBarChart(data, label, canvasId) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const labels = Object.keys(data.subdomains);
    const scores = labels.map(label => data.subdomains[label]);
    
    const chartData = {
        labels: labels,
        datasets: [{
            label: `${label} Subdomain Scores`,
            data: scores,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    new Chart(ctx, config);
}

function displayEmotionalAwarenessDetails(emotionalAwarenessScores) {
    const highestSubdomain = findHighestScoringSubdomain(emotionalAwarenessScores.subdomains);
    const container = document.getElementById("emotional-awareness-details");
    container.innerHTML = `<h2>Your Emotional Strength Lies In:</h2><p><strong>${highestSubdomain.name}:</strong> ${getEmotionalAwarenessDescription(highestSubdomain.name)}</p>`;
}

function getEmotionalAwarenessDescription(subdomain) {
    switch (subdomain) {
        case "SelfAwareness":
            return "Your self-awareness is a key strength in understanding your own needs, desires, failings, and habits. It allows you to recognize what makes you tick, enabling you to navigate life more effectively. This deep self-knowledge is crucial for personal growth and adaptation, helping you tailor your life changes to better suit your needs and aspirations. By being self-aware, you can make informed decisions that reflect your true interests and are better positioned to achieve your goals. This skill enhances your ability to cope with challenges and improves your interactions and relationships with others.";
        case "SelfManagement":
            return "Your self-management skills are vital in controlling your emotions and maintaining composure under pressure. This ability is crucial for upholding professionalism in the workplace and effectively handling life's challenges. Excelling in self-management means you can navigate stressful situations with ease, keeping a clear head to make sound decisions. This skill not only helps you maintain efficiency and productivity but also enhances your resilience, allowing you to face obstacles with determination and grace.";
        case "SocialAwareness":
            return "Your social awareness is key to understanding and effectively navigating social networks. This skill allows you to discern friends from competitors and helps you develop a strong persona in both work and social settings. Being socially aware means you can tune into the nuances of social dynamics and respond appropriately, which is crucial for building and maintaining healthy relationships. This ability not only enhances your interpersonal interactions but also positions you to thrive in environments where collaboration and teamwork are essential.";
        case "RelationshipManagement":
            return "Your relationship management skills enable you to cultivate healthy relationships, influence others' emotions positively, and effectively handle interpersonal conflicts. This ability is essential for building strong connections, both personally and professionally, and for fostering an environment of mutual respect and understanding. By mastering relationship management, you can navigate complex social situations with ease, guide emotional outcomes, and resolve conflicts in ways that strengthen bonds rather than strain them. This skill not only enhances your personal life but also boosts your professional effectiveness by improving teamwork and collaboration.";
        default:
            return "No data available for this subdomain.";
    }
}

function displayJobRecommendation(personalityScores) {
    const highestSubdomain = findHighestScoringSubdomain(personalityScores.subdomains);
    const jobContainer = document.getElementById("job-recommendation");
    jobContainer.innerHTML = `<h2>A CAREER THAT FITS YOUR UNIQUE PERSONA</h2>`;
    jobContainer.style.textAlign = "left"; // Ensures content is aligned left
    let jobContent;

    switch (highestSubdomain.name) {
        case "Realistic":
            jobContent = `
                <p>Likes to work with animals, tools, or machines; generally avoids social activities like teaching, healing, and informing others.</p>
                <p>Has good skills in working with tools, mechanical or electrical drawings, machines, or plants and animals.</p>
                <p>Values practical things you can see, touch, and use like plants and animals, tools, equipment, or machines; and sees self as practical, mechanical, and realistic.</p>
                <p><strong>Occupations you will perform your best potential in:</strong> Engineering (Mechanical, Electric, Aerospace, Chemical etc.), Pilot, Veterinary.</p>
                <p>To find more vocations for Realistic personality access: <a href="https://www.onetonline.org/explore/interests/Realistic/">https://www.onetonline.org/explore/interests/Realistic/</a></p>
            `;
            break;
        case "Investigative":
            jobContent = `
                <p>Likes to study and solve math or science problems; generally avoids leading, selling, or persuading people.</p>
                <p>Is good at understanding and solving science and math problems.</p>
                <p>Values science; and sees self as precise, scientific, and intellectual.</p>
                <p><strong>Occupations you will perform your best potential in:</strong> Medicine, Counsellors/Psychologist, Scientist.</p>
                <p>To find more vocations for Investigative personality access: <a href="https://www.onetonline.org/explore/interests/Investigative/">https://www.onetonline.org/explore/interests/Investigative/</a></p>
            `;
            break;
        case "Artistic":
            jobContent = `
                <p>Likes to do creative activities like art, drama, crafts, dance, music, or creative writing; generally avoids highly ordered or repetitive activities.</p>
                <p>Has good artistic abilities -- in creative writing, drama, crafts, music, or art.</p>
                <p>Values the creative arts -- like drama, music, art, or the works of creative writers; and sees self as expressive, original, and independent.</p>
                <p><strong>Occupations you will perform your best potential in:</strong> Graphic/fashion designer, Art director, Photographer.</p>
                <p>To find more vocations for Artistic personality access: <a href="https://www.onetonline.org/explore/interests/Artistic/">https://www.onetonline.org/explore/interests/Artistic/</a></p>
            `;
            break;
        case "Social":
            jobContent = `
                <p>Likes to do things to help people -- like, teaching, nursing, or giving first aid, providing information; generally avoids using machines, tools, or animals to achieve a goal.</p>
                <p>Is good at teaching, counseling, nursing, or giving information.</p>
                <p>Values helping people and solving social problems; and sees self as helpful, friendly, and trustworthy.</p>
                <p><strong>Occupations you will perform your best potential in:</strong> Psychiatrist/ Psychologist/ Therapist, Social Worker, Flight Attendant.</p>
                <p>To find more vocations for Social personality access: <a href="https://www.onetonline.org/explore/interests/Social/">https://www.onetonline.org/explore/interests/Social/</a></p>
            `;
            break;
        case "Enterprising":
            jobContent = `
                <p>Likes to lead and persuade people, and to sell things and ideas; generally avoids activities that require careful observation and scientific, analytical thinking.</p>
                <p>Is good at leading people and selling things or ideas.</p>
                <p>Values success in politics, leadership, or business; and sees self as energetic, ambitious, and sociable.</p>
                <p><strong>Occupations you will perform your best potential in:</strong> Lawyers, Managers / Executive, Human Resource specialist.</p>
                <p>To find more vocations for Enterprising personality access: <a href="https://www.onetonline.org/explore/interests/Enterprising/">https://www.onetonline.org/explore/interests/Enterprising/</a></p>
            `;
            break;
        case "Conventional":
            jobContent = `
                <p>Likes to work with numbers, records, or machines in a set, orderly way; generally avoids ambiguous, unstructured activities</p>
                <p>Is good at working with written records and numbers in a systematic, orderly way.</p>
                <p>Values success in business; and sees self as orderly, and good at following a set plan.</p>
                <p><strong>Occupations you will perform your best potential in:</strong> Hotel Management, Business Analyst, Technical Writer.</p>
                <p>To find more vocations for Conventional personality access: <a href="https://www.onetonline.org/explore/interests/Conventional/">https://www.onetonline.org/explore/interests/Conventional/</a></p>
            `;
            break;
        }
    jobContainer.innerHTML += jobContent;
}
window.printPage = function() {
    window.print();
}

function displayError(message) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = `<h2>Error</h2><p>${message}</p>`;
}
