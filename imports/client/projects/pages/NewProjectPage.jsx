import React, {Component} from 'react'
import TrackerReact from 'meteor/ultimatejs:tracker-react'
import { createContainer } from 'meteor/react-meteor-data'
import {Grid, Header, Container, Message, Button, Input, Breadcrumb, Icon, Form, Loader} from 'semantic-ui-react'
import TinyMCE from 'react-tinymce'
import ProjectForm from '../ui/ProjectForm'
import ProjectPartial from '/imports/client/projects/ui/ProjectPartial'
import {Projects} from '/imports/api/projects/projects'

export class NewProjectPage extends TrackerReact(Component){

  /*
    required props:
      - none
    facultative props:
      - parent_id: String (id of parent project)
  */

  constructor(props){
    super(props);
    this.state = {
      step: "presentation", // presentation / anonymous / title / content / description / image
      new_project: {
        anonymous: true
      }
    }
  }

  submit_form(e){
    e.preventDefault()
    const {new_project} = this.state
    if(this.props.parent_id){
      new_project.parent = this.props.parent_id
    }
    Meteor.call('projects.insert', new_project, (error, result) => {
      if(error){
        console.log(error)
        Bert.alert({
          title: "Erreur lors de la création de votre projet",
          message: error.reason,
          type: 'danger',
          style: 'growl-bottom-left',
        })
      }else{
        const {project_validation_enabled} = Session.get('global_configuration')
        const validation_message = project_validation_enabled ? "Votre projet sera visible dès qu'il aura été validé" : ''
        Bert.alert({
          title: "Votre projet a bien été créé",
          icon: 'thumbs up',
          message: validation_message,
          type: 'success',
          style: 'growl-bottom-left',
        })
        FlowRouter.go('Projects')
      }
    })
  }

  changeStep(step, e){
    e.preventDefault()
    this.setState({step})
  }

  handleProjectChange(attr, e){
    let {new_project} = this.state
    new_project[attr] = e.target.value
    this.setState({new_project})
  }

  toggleProject(attr, e){
    let {new_project} = this.state
    new_project[attr] = !new_project[attr]
    this.setState({new_project})
  }

  handleContentChange(e){
    let {new_project} = this.state
    new_project.content = e.target.getContent()
    this.setState({new_project})
  }

  copyParentContent(e){
    let {new_project} = this.state
    new_project.content = this.props.parent_project.content
    this.setState({new_project})
  }

  render(){
    const {step, new_project} = this.state
    const {loading, parent_project} = this.props

    if(!loading){
      return(
        <Grid stackable>
          {step != 'presentation' ?
            <Grid.Column width={16} className="center-align animated fadeInDown">
              <Breadcrumb size="big">
                <Breadcrumb.Section link active={step == 'title'} onClick={(e) => {this.changeStep('title', e)}}>Titre</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section link active={step == 'description'} onClick={(e) => {this.changeStep('description', e)}}>Description</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section link active={step == 'content'} onClick={(e) => {this.changeStep('content', e)}}>Contenu</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section link active={step == 'image'} onClick={(e) => {this.changeStep('image', e)}}>Image du projet</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section link active={step == 'anonymous'} onClick={(e) => {this.changeStep('anonymous', e)}}>Anonymat</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right angle' />
                <Breadcrumb.Section link active={step == 'validation'} onClick={(e) => {this.changeStep('validation', e)}}>Validation</Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Column>
            : ''}

            {step == 'presentation' ?
              <Grid.Column width={16} className="center-align new-project-presentation-container">
                <Grid stackable verticalAlign="middle" style={{height: 'inherit'}}>
                  <Grid.Column width={16} className="">
                    <Container>
                      <Header as="h1" className="wow fadeInUp">Vous êtes sur le point de proposer un projet</Header>
                      {parent_project ?
                        <p><Icon name="sitemap" /> alternatif au projet "{parent_project.title}"</p>
                        : ''}
                        <Header as="h3" className="wow fadeInUp" data-wow-delay="1s">Voici quelques petits conseils</Header>
                        <Message
                          icon='unhide'
                          compact
                          header='Donnez un titre expressif à votre projet'
                          content="Plus votre titre collera au contenu de votre projet, mieux les gens sauront dès le premier coup d'oeil si votre projet les intéresse"
                          className="wow fadeInUp"
                          data-wow-delay="2s"
                          />
                        <Message
                          icon='align justify'
                          compact
                          header='Donnez un max de détails'
                          content="Votre projet aura plus de chances d'être mieux compris, et donc plus facilement apprécié. Mais ne soyez pas non plus trop verbeux pour ne pas perdre les gens."
                          className="wow fadeInUp"
                          data-wow-delay="2.5s"
                          />
                        <Message
                          icon='facebook'
                          compact
                          header='Parlez-en autour de vous !'
                          content="Une bonne idée qui n'est pas partagée et débattue ne sert à rien. Parlez-en ! Et partagez votre projet sur les réseaux sociaux !"
                          className="wow fadeInUp"
                          data-wow-delay="3s"
                          />
                        <div className="wow fadeInUp" data-wow-delay="3.5s">
                          <Button positive onClick={(e) => {this.changeStep('title', e)}}>Commencer</Button>
                        </div>
                      </Container>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
                : ''}
                {step == 'title' ?
                  <Grid.Column width={16} className="center-align new-project-presentation-container">
                    <Grid stackable verticalAlign="middle" style={{height: 'inherit'}}>
                      <Grid.Column width={16} className="">
                        <Container>
                          <Header as="h1" className="wow fadeInUp">Premièrement, donnez un titre à votre projet</Header>
                          <Input
                            fluid
                            autoFocus
                            size="huge"
                            placeholder="ex: Refaire la place du centre-ville"
                            onBlur={(e) => {this.handleProjectChange('title', e)}}
                            defaultValue={new_project.title}
                            className="marged"
                            />
                          <Button positive onClick={(e) => {this.changeStep('description', e)}}>Passer à la description</Button>
                        </Container>
                      </Grid.Column>
                    </Grid>
                  </Grid.Column>
                  : ''}
                  {step == 'description' ?
                    <Grid.Column width={16} className="center-align new-project-presentation-container">
                      <Grid stackable verticalAlign="middle" style={{height: 'inherit'}}>
                        <Grid.Column width={16} className="">
                          <Container>
                            <Header as="h1" className="wow fadeInUp">Rédigez une brève description de votre projet (comme un tweet <Icon name="twitter" />)</Header>
                            <Input
                              fluid
                              size="huge"
                              autoFocus
                              placeholder="ex: Proposition d'aménagements culturels et sportifs pour le nouveau quartier qui sera construit dans le centre en 2020"
                              onBlur={(e) => {this.handleProjectChange('description', e)}}
                              defaultValue={new_project.description}
                              className="marged"
                              />
                            <Button size="tiny" onClick={(e) => {this.changeStep('title', e)}}>Précédent</Button>
                            <Button positive onClick={(e) => {this.changeStep('content', e)}}>Passer au contenu</Button>
                          </Container>
                        </Grid.Column>
                      </Grid>
                    </Grid.Column>
                    : ''}
                    {step == 'content' ?
                      <Grid.Column width={16} className="center-align new-project-presentation-container">
                        <Grid stackable style={{height: 'inherit'}}>
                          <Grid.Column width={16} className="">
                            <Container>
                              <Header as="h1" className="wow fadeInUp">Expliquez maintenant en détails votre projet</Header>
                              {parent_project ?
                                <Button onClick={(e) => {this.copyParentContent(e)}}>Copier le contenu du projet initial</Button>
                              : ''}
                              <TinyMCE
                                content={new_project.content}
                                autoFocus
                                config={{
                                  plugins: 'image autoresize media code link colorpicker textcolor imagetools',
                                  toolbar: "undo redo | bold italic | alignleft aligncenter alignright | code | formatselect | link | forecolor backcolor | image ",
                                  menubar: true,
                                  branding: false
                                }}
                                onChange={this.handleContentChange.bind(this)}
                                />
                              <Button size="tiny" onClick={(e) => {this.changeStep('content', e)}}>Précédent</Button>
                              <Button positive onClick={(e) => {this.changeStep('image', e)}}>Passer à l'image de projet</Button>
                            </Container>
                          </Grid.Column>
                        </Grid>
                      </Grid.Column>
                      : ''}
                      {step == 'image' ?
                        <Grid.Column width={16} className="center-align new-project-presentation-container">
                          <Grid stackable style={{height: 'inherit'}}>
                            <Grid.Column width={16} className="">
                              <Container>
                                <Header as="h1" className="wow fadeInUp">Ajoutez une image d'illustration à votre projet</Header>
                                <p>Entrez l'URL d'une image pour illustrer votre projet et le rendre unique et visible</p>
                                <Input
                                  fluid
                                  autoFocus
                                  size="huge"
                                  placeholder="http://"
                                  onChange={(e) => {this.handleProjectChange('image_url', e)}}
                                  defaultValue={new_project.image_url}
                                  className="marged"
                                  />
                                <Button size="tiny" onClick={(e) => {this.changeStep('content', e)}}>Précédent</Button>
                                <Button positive onClick={(e) => {this.changeStep('anonymous', e)}}>Passer à l'anonymat</Button>
                              </Container>
                            </Grid.Column>
                            <Grid.Column width={16} className="center-align">
                              <p>Voilà à quoi ressemble votre projet actuellement</p>
                              <ProjectPartial project={new_project} />
                            </Grid.Column>
                          </Grid>
                        </Grid.Column>
                        : ''}
                        {step == 'anonymous' ?
                          <Grid.Column width={16} className="center-align new-project-presentation-container">
                            <Grid stackable style={{height: 'inherit'}}>
                              <Grid.Column width={16} className="">
                                <Container>
                                  <Header as="h1" className="wow fadeInUp">Choisissez si votre projet est anonyme ou non</Header>
                                  <p>En laissant le projet en anonyme, les autres utilisateurs ne pourront pas vous contacter</p>
                                  <Grid stackable className="marged">
                                    <Grid.Column width={16} className="center-align">
                                      <Button active={new_project.anonymous} size="huge" positive={new_project.anonymous} onClick={(e) => {this.toggleProject('anonymous',e)}}>
                                        <Icon name="spy" size="big"/>
                                        Anonyme
                                      </Button>
                                      <Button active={!new_project.anonymous} size="huge" positive={!new_project.anonymous} onClick={(e) => {this.toggleProject('anonymous',e)}}>
                                        <Icon name="user" size="big"/>
                                        Publique
                                      </Button>
                                      {new_project.anonymous ?
                                        <p><strong>Votre projet est actuellement anonyme</strong> : votre nom ne sera pas lié à ce projet</p>
                                        :
                                        <p><strong>Votre projet est actuellement publique</strong> : vos lecteurs pourront consulter votre profil</p>
                                      }
                                    </Grid.Column>
                                  </Grid>
                                  <Button size="tiny" onClick={(e) => {this.changeStep('image', e)}}>Précédent</Button>
                                  <Button positive onClick={(e) => {this.changeStep('validation', e)}}>Passer à la validation</Button>
                                </Container>
                              </Grid.Column>
                            </Grid>
                          </Grid.Column>
                          : ''}
                          {step == 'validation' ?
                            <Grid.Column width={16} className="center-align new-project-presentation-container">
                              <Grid stackable style={{height: 'inherit'}}>
                                <Grid.Column width={16} className="">
                                  <Container>
                                    <Header as="h1" className="wow fadeInUp">Lancez la validation de votre projet</Header>
                                    <Button size="tiny" onClick={(e) => {this.changeStep('anonymous', e)}}>Précédent</Button>
                                    <Button positive onClick={(e) => {this.submit_form(e)}}>Créer le projet</Button>
                                  </Container>
                                </Grid.Column>
                              </Grid>
                            </Grid.Column>
                            : ''}
                          </Grid>
                        )
    }else{
      return <Loader className="inline-block">Chargement du formulaire de projet</Loader>
    }
  }
}

export default NewProjectPageContainer = createContainer(({parent_id}) => {
    const parentProjectPublication = Meteor.subscribe('project.by_id', parent_id)
    const loading = !parentProjectPublication.ready()
    const parent_project = Projects.findOne({_id: parent_id, validated: true})

    return {
      loading,
      parent_project
    }
}, NewProjectPage)
