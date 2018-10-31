import { InMemoryDbService } from 'angular-in-memory-web-api';
import { God } from './god';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const gods = [
    {   id: 10, name: 'Hades'   },
    {   id: 11, name: 'Apolo'   },
    {   id: 12, name: 'Zeus'   },
    {   id: 13, name: 'Poseidon'   },
    {   id: 14, name: 'Atenea'   },
    {   id: 15, name: 'Hefesto'   },
    {   id: 16, name: 'Ares'   },
    {   id: 17, name: 'Afrodita'   },
    {   id: 18, name: 'Hermes'   },
    {   id: 19, name: 'Hera'   },
    {   id: 20, name: 'Artemisa'   }];
    return {gods};
  }

  // Overrides the genId method to ensure that a god always has an id.
  // If the gods array is empty,
  // the method below returns the initial number (11).
  // if the gods array is not empty, the method below returns the highest
  // god id + 1.
  genId(gods: God[]): number {
    return gods.length > 0 ? Math.max(...gods.map(god => god.id)) + 1 : 11;
  }
}