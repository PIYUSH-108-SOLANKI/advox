# ART Finder - Automated Research and Trigger Finder

## Overview

**ART Finder** is a comprehensive tool that automates the research phase of ad creation for e-commerce marketers. By scraping data from YouTube comments, Reddit threads, app reviews, and competitor ads, ART Finder helps marketers identify user pain points, high-performing hooks, CTAs, and competitor strategies. This allows marketers to craft more effective, data-driven advertising campaigns.

## ✨ Key Features

1. **Research Automation**:
   - **Data Scraping from Multiple Sources**: Scrapes YouTube comments, Reddit discussions, e-commerce app reviews, and competitor ads for insights. This reduces the manual research time and provides a wealth of actionable data.
   - **Custom Keyword Search**: Users can specify keywords like "shopping experience" or "customer satisfaction" to focus on specific pain points or topics.

2. **Actionable Insights Generation**:
   - **Sentiment Analysis**: Analyzes comments and reviews to gauge user sentiment (positive, negative, or neutral).
   - **Pain Point Identification**: Extracts recurring complaints or issues from user feedback.
   - **High-Performing Hooks and CTAs**: Analyzes competitor ads to identify what hooks and CTAs are driving engagement.

3. **Data Visualization Dashboard (UI in Progress)**:
   - **Intuitive Dashboards**: Displays data with easy-to-understand charts, word clouds, and key metrics.
   - **Real-Time Sentiment and Trend Tracking**: Allows marketers to view trends and sentiment analysis based on real-time scraping.

4. **Data Storage & Management**:
   - **NoSQL Database (AstraDB)**: Stores large-scale, unstructured data, including comments, reviews, sentiment scores, hooks, and CTAs, making it easy to retrieve and analyze.

## 🎯 How ART Finder Works

### 1. Data Collection:
- **YouTube Scraping**: Extracts comments, sentiment analysis, likes, and dislikes from videos related to e-commerce.
- **Reddit Scraping**: Collects user discussions and pain points from e-commerce-related subreddits.
- **App Reviews**: Scrapes reviews from e-commerce apps like Zepto, Blinkit, and BigBasket, extracting user feedback, ratings, and common complaints.
- **Competitor Ads Scraping**: Analyzes ads on platforms like Facebook Ads, extracting hooks, CTAs, and engagement metrics.

### 2. Data Analysis:
- **Sentiment Analysis**: Determines overall user sentiment (positive/negative/neutral).
- **Pain Points & Trends**: Identifies frequent issues users face based on comments and reviews.
- **Competitor Strategy Analysis**: Compares high-performing hooks and CTAs from competitor ads.

### 3. Data Visualization:
After scraping and analysis, data is visualized in easy-to-read formats:
- **Word Clouds**: Highlight common words and phrases users mention.
- **Graphs and Charts**: Display sentiment trends, user pain points, and engagement metrics over time.

## 🚀 Project Structure

| File/Folder        | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `art_finder.py`    | Main script for running the data scraping and insights generation.           |
| `scrapers/`        | Folder containing platform-specific scraping scripts (YouTube, Reddit, app reviews). |
| `utils/`           | Helper functions for data cleaning, structuring, and saving into AstraDB.    |
| `data/`            | Stores raw scraped data.                                                    |
| `requirements.txt` | Python dependencies for the project.                                        |
| `ui/`              | Placeholder for the front-end code (web interface/dashboard).                |

## 🌐 UI Integration 
```bash
Here are the Flask commands for installing and setting up its environment on macOS:

Step 1: Install Flask

pip install flask

Step 2: Set Up Flask Environment

1. Export Flask Application
Replace app.py with the name of your main Python file (e.g., langflowrunner.py):

export FLASK_APP=langflowrunner.py


2. Enable Debug Mode (Optional for development)

export FLASK_ENV=development



Step 3: Run the Flask Application

flask run

Notes

Use python3 and pip3 if you're managing Python 3 explicitly.

Access the app in your browser at http://127.0.0.1:5000/.


```

### Tech Stack (for future UI development):
- **Frontend**: HTML, CSS, JavaScript (React or Vue.js)
- **Backend**: Flask or Node.js (for serving data and API connections)
- **Database**: AstraDB (storing scraped and processed data)

### 🎨 UI Template Example (Coming Soon!)

We are designing the user interface to be intuitive and data-rich. Here's a basic layout of how the dashboard will look:

| ART Finder Dashboard (Brand/Keyword Inputs) |

| Sentiment Analysis | Pain Points | Hooks & CTAs |

| Word Cloud | Trends Graph | Insights List |

| Download Reports | Recommendations | Save Data |


## 📁 Cloning and Running the Project

### Prerequisites
Ensure you have the following installed:

- **Python 3.x**
- **Git**

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/ART-Finder.git
   cd ART-Finder
   ```
Create and Activate a Virtual Environment:
```bash
   python3 -m venv env
source env/bin/activate  # macOS/Linux
.\env\Scripts\activate   # Windows
```
Install Dependencies:
```bash
pip install -r requirements.txt
```
Run the Project:
```bash
python art_finder.py
```

🛠 Usage

After installation, you can scrape data and generate insights by running the main script with platform and keyword options:

```bash
python art_finder.py --platform reddit --keywords "shopping experience"
```

Argument	Description
--platform	Platform to scrape from: youtube, reddit, app_reviews, competitor_ads
--keywords	List of keywords to focus on (e.g., "e-commerce", "shopping")

🛠 Future Enhancements

UI Completion: Launching a complete web-based dashboard for visualization and reporting.
Additional Platforms: Expand scraping capabilities to include platforms like Twitter, Instagram, and TikTok.
Machine Learning Integration: Use AI to provide predictive recommendations for ad strategies.
Contributing

We welcome contributions! Feel free to open issues or submit pull requests for improvements or bug fixes.


### Instructions:
1. Copy this into your `README.md` file in your GitHub repository.
2. This formatting will display correctly in GitHub, with proper headers, lists, tables, and code blocks.
3. Make sure to update the `git clone` URL with your actual repository link.
4. Once this is added, users will see the structured format for better readability and interaction.
