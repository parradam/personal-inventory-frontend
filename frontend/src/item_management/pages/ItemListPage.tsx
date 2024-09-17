import { useState, useEffect } from 'react';

import ItemListView from '../components/ItemListView';
import CreateItemModal from '../components/CreateItemModal';
import CreateItemForm from '../components/CreateItemForm';
import {
  getItemList,
  removeItem,
  ItemListResponseData,
} from '../services/itemService';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const ItemListPage = () => {
  const [itemList, setItemList] = useState<ItemListResponseData[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [showCreateItemModal, setShowCreateItemModal] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const retrievedItemList = await getItemList();
        setItemList(retrievedItemList);
      } catch (error) {
        console.error('Error fetching item list', error);
      }
    };

    void fetchItem();
  }, []);

  const removeItemFromList = async (itemId: number) => {
    try {
      // Remove item from server
      await removeItem(itemId);
      // Reflect change in local state
      const updatedItemList: ItemListResponseData[] = itemList.reduce<
        ItemListResponseData[]
      >((listOfItems, item) => {
        if (item.id === itemId) {
          return listOfItems;
        } else {
          return [...listOfItems, item];
        }
      }, []);
      setItemList(updatedItemList);
    } catch (error) {
      console.error('Error removing item from list', error);
    }
  };

  return (
    <div>
      <div className="p-4">
        <Card>
          <CardHeader className="gap-6">
            <CardTitle>Your inventory</CardTitle>
            <div className="flex justify-between">
              <Input
                className="max-w-60"
                placeholder="Search..."
                value={searchFilter}
                onChange={(event) => {
                  setSearchFilter(event.target.value);
                }}
              />
              <Button
                onClick={() => {
                  setShowCreateItemModal(true);
                }}
              >
                Add item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ItemListView
              itemList={itemList}
              searchFilter={searchFilter}
              removeItemFromList={removeItemFromList}
            />
          </CardContent>
        </Card>
      </div>
      <CreateItemModal showCreateItemModal={showCreateItemModal}>
        <CreateItemForm
          setItemList={setItemList}
          setShowCreateItemModal={setShowCreateItemModal}
        />
      </CreateItemModal>
    </div>
  );
};

export default ItemListPage;
