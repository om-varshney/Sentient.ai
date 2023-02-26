# Sentient.ai
## Working Plan
1. User comes to website and enters a handle or a hashtag
2. if handle:
   1. step 1: Search for tweets by the user and give engagement information.
   2. step 2: Search for tweets mentioning the user and give sentiment and emotional analysis.
3. if hashtag:
   1. Search for tweets with that hashtag and give sentiment and emotional analysis.

## Application Design
I would like to have a partially dynamic dashboard. For example, the information about current tweet should keep
updating in real time. Further I would like to have interactive Charts for the user.


## To-Do
1. Ping Server to check if entered handle exists.
2. time-based tweet segmentation for influencers
   1. Segment tweets into percentiles. Try and find out patterns in time.
3. Classify users into haters and loyal customers using coefficient of variance.
4. Average Tweets per week sorta thing.
5. Demographic Analysis can be provided if the user has disclosed their Location
6. Add Trend analysis to replies and Sentiment analysis to self tweets
7. Make it about twitter handle only.
8. So like top 3 commentors, and just like the radar chart we have, just add commentor name instead of polarity
   1. Side by side provide an analysis on the commentor using bar chart and pie
9. Include Bi-Grams and Tri-Grams in the text.
10. Preprocess the tweets using Regex before sentiment analysis.
11. Add Bi-Gram and Tri-Gram sentiment analysis for the dataset using a radar chart.
12. **Maybe. Just Maybe. Integrate BERT to answer Question about data.**