create database ai_trainer;
use ai_trainer;

create table User (
    userId int primary key auto_increment,
    account varchar(255) unique not null,
    nickName varchar(255) not null,
    password varchar(255) not null,
    speechRegion varchar(255),
    speechKey varchar(255),
    openId varchar(255)
);

create table Scene (
    sceneId int primary key auto_increment,
    sceneName varchar(255) not null
    description varchar(255) not null,
    systemPrompt varchar(255) not null,
);

create table Chat (
    chatId int primary key auto_increment,
    sceneId int not null,
    chatName varchar(255) not null,
    numberOfConversations int unsigned check (numberOfConversations BETWEEN 2 AND 100) not null,
    characterName varchar(255) not null,
    characterGender char(1) check (characterGender in ('0', '1')) not null,
    foreign key(sceneId)references Scene(sceneId)on delete cascade,
);

create table UserChats (
    userId int,
    chatId int,
    primary key(userId, chatId),
    foreign key(userId)references User(userId)on delete cascade,
    foreign key(chatId)references Chat(chatId)on delete cascade
);

create table Conversation(
    conversationId int primary key auto_increment,
    chatId int,
    userContent varchar(255) not null,
    assistantContent varchar(255) not null,
    created_at timestamp default current_timestamp not null,
    foreign key(chatId)references Chat(chatId)on delete cascade
);

