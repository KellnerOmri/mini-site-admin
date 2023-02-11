import './AddCategoryToList.scss'
import React, {useState} from "react";
import {Paper, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {Button} from "../../../../../components/button/Button";
import {Icon} from "../../../../../components/icon/Icon";
import {setHeatList} from "../../../../../store/data.slice";
import {HeatModel} from "../../../../../models/heat.model";
import {CategoryModel} from "../../../../../models/category.model";
import {AlertPopup} from "../../../../../components/alert-popup/AlertPopup";
import {text} from "../../../../../utils/dictionaryManagement";
import {GlobalApiService, headersApi} from "../../../../../services/global-api.service";

export const AddCategoryToList: React.FC<{ heat: HeatModel, index: number }> = ({heat, index}) => {
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
                <div className={"category-list-container"}>
                    {heat?.categoriesLIst?.map((item, index) => (
                        <div style={{direction: isEnglish ? "ltr" : "rtl", textAlign: isEnglish ? "left" : "right"}}
                             className={"category-list-item"} key={index}>
                            <div className={"sort-key-container"}>
                                <span>Sort Key : {item.sortKey}</span>
                            </div>

                            <div className={"description-wrapper"}>
                                <span>{`${item.description}`}</span>
                            </div>


                            <div className={"close_x-wrapper"} onClick={() => removeCategory(item)}>
                                <Icon name={"close_x"}/>
                            </div>
                        </div>
                    ))}
                </div>
            </Paper>
        </div>
    );
}