import {useEffect, useState} from "react";
import {createID} from "../lib/createID";
import {useUpdate} from "hooks/useUpdate";


const useTags = () => {
    const [tags, setTags] = useState<{ id: number, name: string }[]>([]);
    useEffect(() => {
        let localTags = (JSON.parse(window.localStorage.getItem('tags') || '[]'))
        if (localTags.length === 0) {
            localTags = [
                {id: createID(), name: '衣'},
                {id: createID(), name: '食'},
                {id: createID(), name: '住'},
                {id: createID(), name: '行'},
            ]
        }
        setTags(localTags)
    }, [])
    useUpdate(() => {
        window.localStorage.setItem('tags', JSON.stringify(tags))
    }, [tags])
    const findTag = (id: number) => tags.filter(tag => tag.id === id)[0]
    const findTagIndex = (id: number) => {
        let result = -1;             //防止出现循环结束没有发现id对应的i
        for (let i = 0; i < tags.length; i++) {
            if (tags[i].id === id) {
                result = i;         //
                break;
            }
        }
        return result
    }
    const updateTag = (id: number, obj: { name: string }) => {
        setTags(tags.map(tag => {
            if (tag.id === id) {
                return {id, name: obj.name};
            } else {
                return tag
            }
        }))
    }
    const deleteTag = (id: number) => {
        setTags(tags.filter(tag => tag.id !== id))
    }
    const addTag = () => {
        const tagName = window.prompt('新标签的名称为');
        if (tagName !== null && tagName !== '') {
            setTags([...tags, {id: createID(), name: tagName}])
        }
    }
    const getName=(id:number)=>{
       return tags.filter(t=>t.id===id)[0] ? tags.filter(t=>t.id===id)[0].name:''

    }
    return {tags, setTags,getName, findTag, updateTag, deleteTag, addTag, findTagIndex}
}


export {useTags}