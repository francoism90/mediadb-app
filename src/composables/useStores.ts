import { useQuasar } from 'quasar';
import { Model } from 'src/interfaces';
import { deleted, updated } from 'src/services/store';

export const useStores = () => {
  const $q = useQuasar();

  const onUpdate = (model: Model) => {
    $q.notify({
      type: 'positive',
      message: 'An update has just been made.',
      caption: model.name || model.id,
      classes: 'no-shadow',
    });

    updated(model);
  };

  const onDelete = (model: Model) => {
    $q.notify({
      type: 'info',
      message: 'A deletion has just been made.',
      caption: model.name || model.id,
      classes: 'no-shadow',
    });

    deleted(model);
  };

  return {
    onDelete,
    onUpdate,
  };
};
