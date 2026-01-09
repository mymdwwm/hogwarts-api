import {ChangeDetectorRef, Component, inject, OnInit, signal, OnDestroy} from '@angular/core';
import {CharacterModel} from '../../shared/models/character.model';
import {CharacterService} from '../../shared/services/character-service';
import {CharactersList} from './components/characters-list/characters-list';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-characters',
  imports: [
    CharactersList
  ],
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class Characters implements OnInit, OnDestroy {

  private cdRef = inject(ChangeDetectorRef);

  // 1. Stocker toutes les données de l'API dans une variable - affichage html.
  //protected characters: CharacterModel[] = [];

  // Mode signal.
  protected characters = signal<CharacterModel[]>([]);

  // 2. Injecter notre character service.
  private characterService = inject(CharacterService);
    // Subscriptions.
  // private subscriptions: Subscription[] = [];
  private subscription: Subscription = new Subscription();

  ngOnInit() {

    this.subscription.add(this.characterService.getAllCharacter().subscribe((allCharacters: CharacterModel[]) => {

        this.characters.set(allCharacters);
      }));
    }
  
    ngOnDestroy() {
      // Implémenter notre logique.
      // this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
      this.subscription.unsubscribe();
  }
}