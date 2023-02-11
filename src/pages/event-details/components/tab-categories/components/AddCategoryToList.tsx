import './AddCategoryToList.scss'
import React, {useState} from "react";
import {Paper, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {Button} from "../../../../../components/button/Button";
import {Icon} from "../../../../../components/icon/Icon";
import {setHeatList, setSelectedCategory} from "../../../../../store/data.slice";
import {HeatModel} from "../../../../../models/heat.model";
import {CategoryModel} from "../../../../../models/category.model";
import {AlertPopup} from "../../../../../components/alert-popup/AlertPopup";
import {text} from "../../../../../utils/dictionaryManagement";
import {GlobalApiService, headersApi} from "../../../../../services/global-api.service";
import { setEditCategoryPopup} from "../../../../../store/global.slice";

export const AddCategoryToList: React.FC<{ heat: HeatModel, index: number ,setHeatIndex:any}> = ({heat, index,setHeatIndex}) => {
    const dispatch = useAppDispatch();
    const {isEnglish} = useAppSelector(state => state.global);
    const {heats} = useAppSelector(state => state.data);
    const [newItem, setNewItem] = useState<string>("");
    const [newSortKey, setNewSortKey] = useState<number | string>("");
    const [showPopupAlert, setPopupAlert] = useState<boolean>(false)
    const addToList = (e: any) => {
        const newCategory = {
            heatId: heat.heatId,
            description: newItem,
            sortKey: newSortKey
        }

        const newCategoriesList: CategoryModel[] = [...heats[index].categoriesLIst]
        const sortKeyList: number[] = newCategoriesList.map((c) => c.sortKey as number)

        if (sortKeyList.includes(newSortKey as number)) {
            setPopupAlert(true)
        } else {
            fetch(`${GlobalApiService}/api/v1/category`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        newCategory
                    }),
                    headers: headersApi
                }
            )
                .then((res) => res.json())
                .catch((err) => {
                    console.log(err.message);
                });
            newCategoriesList.push(newCategory)
            newCategoriesList.sort((a,b)=> (a.sortKey as number)- (b.sortKey as number));
            const newHeat: HeatModel = {...heats[index], categoriesLIst: newCategoriesList}
            const newHeatsArray: HeatModel[] = [...heats];
            newHeatsArray[index] = newHeat;
            dispatch(setHeatList(newHeatsArray))
        }
        setNewItem("");
        setNewSortKey("");
        e.preventDefault()
    };
    const editCategory=(editCategory:CategoryModel)=>{
        setHeatIndex(index)
        dispatch(setSelectedCategory(editCategory))
        dispatch(setEditCategoryPopup(true))
    }
    const removeCategory = (deleteItem: CategoryModel) => {
        const newCategoriesList: CategoryModel[] = [...heats[index].categoriesLIst]
        console.log(newCategoriesList,"newCategoriesList")
        const deleteCategory = deleteItem;
        fetch(`${GlobalApiService}/api/v1/category`,
            {
                method: 'DELETE',
                body: JSON.stringify({
                    deleteCategory
                }),
                headers: headersApi
            }
        )
            .then((res) => res.json())
            .catch((err) => {
                console.log(err.message);
            });
        const deleteIndex= newCategoriesList.findIndex((c)=>c.sortKey === deleteItem.sortKey && c.heatId===deleteItem.heatId);
        newCategoriesList.splice(deleteIndex, 1);
        const newHeat: HeatModel = {...heats[index], categoriesLIst: newCategoriesList}
        const newHeatsArray: HeatModel[] = [...heats];
        newHeatsArray[index] = newHeat;
        dispatch(setHeatList(newHeatsArray))
    };

    const titles = ["Sort key", "Description", "Action"];
    const H_titles = ["מספר מיון", "תיאור הקטגוריה", "פעולה"];

    const getTitlesByLanguage=():string[]=>{
        return isEnglish?titles:H_titles.reverse();
    }

    return (
        <div className={"add-categories-wrapper"}>
            <Paper className={"add-categories-container"}>
                {showPopupAlert &&
                    <AlertPopup closeModal={() => setPopupAlert(false)}
                                warningDescription={isEnglish ? text.sortKeyCannotDuplicated : text.H_sortKeyCannotDuplicated}/>
                }
                <form id={`edit-category-form-${index}`} className={"add-container-text-field"} onSubmit={addToList}>
                    <Button size={"none"} type={"submit"} form={`edit-category-form-${index}`} iconKey={"plus"}
                            functionAction={() => {
                            }}></Button>
                    <TextField
                        fullWidth={true}
                        label={isEnglish ? "add category" : "הוסף קטגוריה חדשה"}
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        dir={isEnglish ? "ltr" : "rtl"}
                        id="new-category"
                        name="description"
                        type={"text"}
                        required={true}
                    />
                    <TextField
                        fullWidth={true}
                        label={isEnglish ? "Sort key" : "מספר מיון"}
                        value={newSortKey}
                        onChange={(e) => setNewSortKey(Number(e.target.value))}
                        dir={isEnglish ? "ltr" : "rtl"}
                        id="new-category"
                        name="sortKey"
                        type={"number"}
                        InputProps={{ inputProps: { min: 1 } }}
                        required={true}
                    />
                </form>
                    {heat?.categoriesLIst.length > 0 ? <div>
                            <table className={"table-style"}>
                                <thead>
                                <tr className={"first-row row"}>
                                    {getTitlesByLanguage().map((title, index) => {
                                        return (
                                            <th key={index} className={"table-headers"}>
                                                <span className={`${index===titles.length-1?"last-title":""}`}>{title}</span>
                                            </th>
                                        );
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {heat?.categoriesLIst.map((category, index) => {
                                    return  isEnglish ? <tr key={index}>

                                            <td>{category.sortKey}</td>
                                            <td>{category.description}</td>
                                            <td className={"action-category-wrapper"} style={{justifyContent:"end"}}>
                                                <div className={"edit-wrapper"} onClick={() => editCategory(category)}>
                                                    <Icon name={"editIcon"}/>
                                                </div>
                                                <div className={"close_x-wrapper"} onClick={() => removeCategory(category)}>
                                                    <Icon name={"close_x"}/>
                                                </div>
                                            </td>
                                        </tr>:
                                        <tr key={index}>
                                            <td className={"action-category-wrapper"}>
                                                <div className={"close_x-wrapper"} onClick={() => removeCategory(category)}>
                                                    <Icon name={"close_x"}/>
                                                </div>
                                                <div className={"edit-wrapper"} onClick={() => editCategory(category)}>
                                                    <Icon name={"editIcon"}/>
                                                </div>
                                            </td>
                                            <td>{category.description}</td>
                                            <td style={{display:"flex",justifyContent:"end"}}>{category.sortKey}</td>
                                        </tr>

                                })}
                                </tbody>
                            </table>
                        </div> :
                        <div className={"alert-style"}>
                            <span className={"alert-style"}>{text.noExistsCategories}</span>
                        </div>}
            </Paper>
        </div>
    );
}