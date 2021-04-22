import tcb from '@cloudbase/node-sdk';
import { tcbConfig } from '../env';

const { Author, Article } = (() => {
    const db = tcb.init(tcbConfig).database();
    return {
        Author: db.collection('author'),
        Article: db.collection('article'),
    };
})();

export const getHomePosts = async () => {
    const posts = (await Article
        .where({})
        .orderBy('_updateTime', 'desc')
        .limit(10)
        .get()).data;
    for (const post of posts) {
        const { name } = (await Author
            .where({ _id: post.author })
            .get()).data[0];
        post.author = name;
    }
    return {
        posts
    }
};

const dealWithUrl = url => 'https://' + url
    .replace(`cloud://${tcbConfig.env}.`, '')
    .replace('/cloudbase-cms', '.tcb.qcloud.la/cloudbase-cms');

export const getAllPostId = async () => {
    let posts = (await Article.where({}).get()).data;
    return posts.map(value => ({
        params: { id: value._id }
    }))
};

export const getPost = async (id) => {
    const post = (await Article.where({ _id: id }).get()).data[0];
    const { name, avator } = (await Author
        .where({ _id: post.author })
        .get()).data[0];
    post.author = name;
    post.avator = dealWithUrl(avator);
    post.image = dealWithUrl(post.image);
    return post;
};