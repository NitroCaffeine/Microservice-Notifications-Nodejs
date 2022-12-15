/* eslint-disable prettier/prettier */


export class Content {
  private readonly content: string;


    get value(): string{
        return this.content
    }

    private validateContentLength( content): boolean {
        return content.length > 5 && content.length < 240

    }

    constructor (content:string){
        const isContentValid = this.validateContentLength(content)

        if (!isContentValid){
            throw new Error('Content length invalid')

        }
        this.content= content
    }
}