#--*-- coding: gbk --*--
from typing import Union
from fastapi import FastAPI
import os
import openai
#import unicodedata
#return {"text": unicodedata.normalize('NFKC',response['choices'][0]['text']).strip()}


#os.environ["http_proxy"] = "http://127.0.0.1:1080"
#os.environ["https_proxy"] = "http://127.0.0.1:1080"

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/api")
def read_api(messages: str):
    openai.api_key = "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"
    messages=messages.replace('@Socor :','')
    response = openai.ChatCompletion.create (
    model="gpt-3.5-turbo-0301", 
    messages=[{"role": "user", "content": messages}]
    #max_tokens=2000
    )
    res=response['choices'][0]['message']['content'].replace('assistant:','').replace('assistant','').replace('��Ǹ��','').replace('�ǳ���Ǹ��','').replace('�ܱ�Ǹ��','')
    return {"text":res}
###   uvicorn ls:app --reload     ### ��������