
# coding: utf-8

# In[20]:


import pandas as pd
import numpy as np


# In[21]:


data = pd.read_csv('../ProjData/airbnb-sep-2017/listings.csv',dtype={'neighbourhood': str})
data


# In[22]:


basic = data[['neighbourhood_cleansed', 'price']]
basic.head()


# In[23]:


basic['price'] = basic['price'].replace( '[\$,)]','', regex=True ).astype(float)
basic.head()


# In[24]:


averages = pd.DataFrame(columns=['neighborhood', 'avg_price'])

for name, group in basic.groupby('neighbourhood_cleansed'):
    averages.loc[len(averages)] = [name, group['price'].mean()]
    
averages


# In[25]:


import matplotlib.pyplot as plt
averages.plot(x='neighborhood', y='avg_price', kind='bar')
plt.show()
averages.to_csv('averages.csv', index=False)


# In[26]:


reviews = data[['review_scores_rating','price']]
reviews['price'] = reviews['price'].replace( '[\$,)]','', regex=True ).astype(float)
reviews['review_scores_rating'] = reviews['review_scores_rating'].astype(float)
reviews.head()


# In[27]:


type(reviews['review_scores_rating'][0])


# In[28]:


reviews.plot(x='review_scores_rating', y='price', kind='hexbin', xlim=[95,100], ylim=[0,300], gridsize = 500)
plt.show()


# In[29]:


reviews = reviews[np.isfinite(reviews['review_scores_rating'])]


# In[30]:


reviews.sample(n=50)
reviews.head()


# In[31]:


reviews.to_csv('reviewSample.csv', index=False)


# In[32]:


houses = data[['neighbourhood_cleansed', 'latitude','longitude','reviews_per_month','review_scores_value', 'price','bathrooms','bedrooms', 'number_of_reviews','listing_url','name']]



# In[33]:


houses.to_csv('houses.csv', index=False)


# In[34]:


reviewScore = pd.DataFrame(columns=['neighborhood', 'avg_review'])

for name, group in data.groupby('neighbourhood_cleansed'):
    reviewScore.loc[len(reviewScore)] = [name, group['review_scores_value'].mean()]
    
reviewScore


# In[35]:


reviewNumber = pd.DataFrame(columns=['neighborhood', 'review_number'])

for name, group in data.groupby('neighbourhood_cleansed'):
    reviewNumber.loc[len(reviewNumber)] = [name, group['number_of_reviews'].mean()]
    
reviewNumber


# In[36]:


reviewData = pd.DataFrame(columns=['avg_review','neighborhood'])
reviewData['neighborhood'] = reviewScore['neighborhood']
reviewData['avg_review'] = reviewScore['avg_review']

reviewData


# In[37]:


reviewData.to_csv('reviewData.csv', index=False)


# In[38]:


weekly = data[['latitude','longitude', 'price','reviews_per_month']]
weekly['price'] = weekly['price'].replace( '[\$,)]','', regex=True ).astype(float)
weekly['reviews_per_month'].fillna(0,inplace=True)
weekly = weekly[np.isfinite(weekly['price'])]
weekly


# In[39]:


weekly.to_csv('weekly.csv', index=False)


# In[48]:


averages.to_json(orient='records')


# In[51]:


monthly = pd.DataFrame(columns=['neighborhood', 'avg_reviews_month'])

for name, group in data.groupby('neighbourhood_cleansed'):
    monthly.loc[len(monthly)] = [name, group['reviews_per_month'].mean()]
    
monthly.to_json(orient='records')

