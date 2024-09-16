import { Button } from '@/components/ui/button';
import ItemListView from '../components/ItemListView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import CreateItemModal from '../components/CreateItemModal';
import CreateItemForm from '../components/CreateItemForm';
import {
  getItemList,
  removeItem,
  ItemListResponseData,
} from '../services/itemService';

const ItemListPage = () => {
  const [itemList, setItemList] = useState<ItemListResponseData[]>([]);
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
          <CardHeader>
            <CardTitle>Your inventory</CardTitle>
            <div className="text-right">
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
