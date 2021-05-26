import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getObjectsByClassUri } from '../../actions/ontology/classes/classes';
import { TClass } from '../../actions/ontology/classes/types';
import { RootStore } from '../../store';
import { getName, nodeFilter } from '../../utils';
import Loading from '../Loading';
import ObjectInfo from '../Ontology/ObjectInfo';



interface IObjectListProps {
  class_uri: string
}

const ObjectList: React.FunctionComponent<IObjectListProps> = (props) => {
  const dispatch = useDispatch()
  const classState = useSelector((state: RootStore) => state.classes)

  const [objectWindowSearch, setObjectWindowSearch] = React.useState('')


  const [items, setItems] = React.useState<TClass[]>([])
  const [selectedItem, setSelectedItem] = React.useState(-1)

  React.useEffect(() => {
    dispatch(getObjectsByClassUri(props.class_uri))
  }, [, props.class_uri, classState.createdEntity])
  React.useEffect(() => {
    const data = classState.selectedObjectsByUri
    if (data && data.uri != props.class_uri) return;
    setItems(data.objects)
  }, [, classState.selectedObjectsByUri])



  return <>
    {classState.isObjectsLoadingByUri && <><Loading height={300} /></>}
    {!classState.isObjectsLoadingByUri && items.length > 0 && <>
      <div className='og-objectlist-search'>
        <input placeholder='Поиск' value={objectWindowSearch} onChange={e => setObjectWindowSearch(e.target.value)}></input>
      </div>
      {items.filter(node => nodeFilter(objectWindowSearch, node)).map(item => {
        return <>
          <div onClick={_ => setSelectedItem(item.id)} className='og-class-title'>
            <p >{getName(item)}</p>
          </div>
        </>
      })} </>
    }
    {!classState.isObjectsLoadingByUri && items.length === 0 && <>
      <div id='empty'><i className='fas fa-times'></i></div>
    </>}
    {selectedItem != -1 && <ObjectInfo onSelect={id => setSelectedItem(id)} object_id={selectedItem} onClose={() => setSelectedItem(-1)} />}

  </>;

};

export default ObjectList;
