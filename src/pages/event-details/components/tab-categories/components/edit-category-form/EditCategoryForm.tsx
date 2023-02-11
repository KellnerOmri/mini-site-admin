import './EditCategoryForm.scss'
import {TextField} from "@mui/material";
import React, {useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../../app/hooks";
import {setEditCategoryPopup} from "../../../../../../store/global.slice";
import {setHeatList} from "../../../../../../store/data.slice";
import {GlobalApiService, headersApi} from "../../../../../../services/global-api.service";
import {CategoryModel} from "../../../../../../models/category.model";
import {HeatModel} from "../../../../../../models/heat.model";
import {AlertPopup} from "../../../../../../components/alert-popup/AlertPopup";
import {text} from "../../../../../../utils/dictionaryManagement";

export const EditCategoryForm: React.FC<{ heatIndex: number }> = ({heatIndex}) => {
    const dispatch = useAppDispatch();
    const {isEnglish} = useAppSelector(state => state.global);
    const {selectedCategory, heats} = useAppSelector(state => state.data);
    const [newItem, setNewItem] = useState<string>(selectedCategory!.description as string);
    const [newSortKey, setNewSortKey] = useState<number | string>(selectedCategory!.sortKey as number);
    const [showPopupAlert, setPopupAlert] = useState<boolean>(false)


    const updateCategory: CategoryModel = useMemo(() => {
        return {
            section: selectedCategory?.section as number,
            heatId: selectedCategory?.heatId as number,
            sortKey: newSortKey,
            description: newItem
        }
    }, [newItem, newSortKey])
    const updateCategoriesLIst = (e: any) => {


        const newCategoriesList: CategoryModel[] = [...heats[heatIndex].categoriesLIst]
        const sortKeyList: number[] = newCategoriesList.map((c) => c.sortKey as number)

        if (sortKeyList.includes(newSortKey as number)) {
            setPopupAlert(true)
            setNewSortKey("")
            e.preventDefault()
            return;
        } else {
            dispatch(setEditCategoryPopup(false))
            fetch(`${GlobalApiService}/api/v1/category/${selectedCategory?.section}`,
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        updateCategory
                    }),
                    headers: headersApi
                }
            )
                .then((res) => res.json())
                .catch((err) => {
                    console.log(err.message);
                }).then(() => {
                e.stopPropagation()
            });
            // const newCategoriesList: CategoryModel[] = [...heats[heatIndex].categoriesLIst]
            const updateCategoryIndex = newCategoriesList.findIndex((c) => c.section === selectedCategory?.section);
            newCategoriesList[updateCategoryIndex] = updateCategory;
            const newHeat: HeatModel = {...heats[heatIndex], categoriesLIst: newCategoriesList}
            const newHeatsArray: HeatModel[] = [...heats];
            newHeatsArray[heatIndex] = newHeat;
            dispatch(setHeatList(newHeatsArray))
            e.preventDefault()
        }
    }
    return <div>
        <form id={"update-category-form"} className={"edit-category-form-wrapper"} onSubmit={updateCategoriesLIst}>
            <TextField
                label={isEnglish ? "add category" : "הוסף קטגוריה חדשה"}
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                dir={isEnglish ? "ltr" : "rtl"}
                id="input1"
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
                id="input2"
                name="sortKey"
                type={"number"}
                InputProps={{inputProps: {min: 1}}}
                required={true}
            />
        </form>
        {showPopupAlert &&
            <AlertPopup closeModal={() => setPopupAlert(false)}
                        warningDescription={isEnglish ? text.sortKeyCannotDuplicated : text.H_sortKeyCannotDuplicated}/>
        }
    </div>
}